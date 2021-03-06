import {
  exists,
  readFile,
  writeFile,
  lstat,
  notExists,
} from '../lib/better-fs';
import { ROOT } from '../constants';
import { join } from 'path';
import {
  preprocess,
  RootRuleset,
  NoteRuleset,
  AnyRuleset,
  combineRuleset,
} from '../pgfm';
import { chalk, Logger } from '../util/console';
import { getProblemList, Problem } from '../lib/problem';
import { cached, Duration, permastate } from '../cache';
import { PathLike } from 'fs';
import { Command, flags } from '@oclif/command';

async function getLastUpdate(path: PathLike): Promise<string> {
  return (await lstat(path)).mtime.toISOString();
}

const fetchLastNoteUpdate = cached(
  (problem: Problem) => getLastUpdate(problem.noteFile),
  (problem) => `${problem.id}/last-note-update`,
  Duration.of({ day: 14 }),
);

const fetchLastReadMeUpdate = cached(
  getLastUpdate,
  'last-readme-update',
  Duration.of({ day: 14 }),
);

const fetchLastProblemList = cached(
  async () => (await getProblemList()).map((problem) => problem.id),
  'last-problem-list',
  Duration.of({ day: 1 }),
);

export default class UpdateReadmeCommand extends Command {
  public static description = 'Update README.md files';

  public static flags = {
    force: flags.boolean({
      char: 'f',
      description: 'Whether to force update README.md files',
    }),
  };
  async run() {
    let force = this.parse(UpdateReadmeCommand).flags.force;
    const base = new Logger('update-readme');

    const problemList = await getProblemList();

    const problemLoggers = base.labeled(
      problemList.map((it) => it.id),
      ['info', 'error', 'success', 'warning'],
    );
    const { info, error, success, warning } = base.labeled(
      {
        info: chalk.blue,
        error: chalk.red,
        success: chalk.green,
        warning: chalk.yellow,
      },
      problemList.map((it) => it.id),
    );

    let problemUpdated =
      problemList.map((it) => it.id) != (await fetchLastProblemList());

    for (const problem of problemList) {
      const log = problemLoggers[problem.id];
      if (!problem.isSolved) {
        log(chalk.yellow, 'Not solved, pass.');
        continue;
      }
      if (await notExists(problem.noteFile)) {
        log(chalk.yellow, 'Note not found, pass.');
        continue;
      }
      const lastUpdate = await fetchLastNoteUpdate(problem);

      if (
        !force &&
        lastUpdate.fetchKind === 'file' &&
        (await getLastUpdate(problem.noteFile)) == lastUpdate
      ) {
        continue;
      }

      const noteTemplate = await readFile(problem.noteFile, {
        encoding: 'utf-8',
      });

      const result = await preprocess(
        problem.noteFile,
        log.colored(chalk.yellow),
        noteTemplate,
        { problem },
        combineRuleset(NoteRuleset, AnyRuleset),
      );

      const target = join(ROOT, problem.id.toString(), 'README.md');

      writeFile(target, result);

      log(chalk.green, 'Success.');

      await fetchLastNoteUpdate.force(problem);

      problemUpdated = true;
    }

    const templateFile = join(ROOT, 'template', 'README.template.md');
    if (await notExists(templateFile)) {
      error('File not found: template/README.template.md');
      return;
    }

    if (!force && !problemUpdated) {
      const lastUpdate = await fetchLastReadMeUpdate(templateFile);

      if (
        lastUpdate.fetchKind === 'file' &&
        (await getLastUpdate(templateFile)) == lastUpdate
      ) {
        success('README.md is already up-to-date');
        return;
      }
    }

    info('Create README.md based on template/README.template.md...');
    const template = await readFile(templateFile, {
      encoding: 'utf-8',
    });

    const result = await preprocess(
      templateFile,
      warning,
      template,
      {},
      combineRuleset(RootRuleset, AnyRuleset),
    );

    const target = join(ROOT, 'README.md');

    writeFile(target, result);

    success('All done!');
  }
}
