import { exists, readFile, writeFile, lstat } from '../src/better-fs';
import { ROOT } from '../src/constants';
import { join } from 'path';
import { preprocess, RootRuleset, NoteRuleset } from '../src/pgfm';
import { chalk, Logger } from '../src/util/console';
import { getProblemList, Problem } from '../src/problem';
import { cached, Duration } from '../src/cache';
import { PathLike } from 'fs';

async function getLastUpdate(path: PathLike): Promise<string> {
  return (await lstat(path)).mtime.toISOString();
}

const fetchLastNoteUpdate = cached(
  (problem) => `${problem.id}/last-note-update`,
  Duration.of({ day: 14 }),
  (problem: Problem) => getLastUpdate(problem.noteFile)
);

(async () => {
  const base = new Logger('update-readme');

  const problemList = await getProblemList();

  const problemLoggers = base.labeled(
    problemList.map((it) => it.id),
    ['info', 'error', 'success']
  );
  const { info, error, success } = base.labeled(
    {
      info: chalk.blue,
      error: chalk.red,
      success: chalk.green,
    },
    problemList.map((it) => it.id)
  );

  for (const problem of problemList) {
    const log = problemLoggers[problem.id];
    if (!problem.isSolved) {
      log(chalk.yellow, 'Not solved, pass.');
      continue;
    }
    if (!(await exists(problem.noteFile))) {
      log(chalk.yellow, 'Note not found, pass.');
      continue;
    }
    const lastUpdate = await fetchLastNoteUpdate(problem);

    if (
      lastUpdate.fetchKind !== 'first' &&
      (await getLastUpdate(problem.noteFile)) == lastUpdate
    ) {
      log(chalk.green, 'Already up-to-date');
      continue;
    }

    const noteTemplate = await readFile(problem.noteFile, {
      encoding: 'utf-8',
    });

    const result = await preprocess(noteTemplate, { problem }, NoteRuleset);

    const target = join(ROOT, problem.id.toString(), 'README.md');

    writeFile(target, result);

    log(chalk.green, 'Success.');
  }

  info('Create README.md based on template/README.template.md...');
  const templateFile = join(ROOT, 'template', 'README.template.md');
  if (!(await exists(templateFile))) {
    error('File not found: template/README.template.md');
  }
  const template = await readFile(templateFile, {
    encoding: 'utf-8',
  });

  const result = await preprocess(template, {}, RootRuleset);

  const target = join(ROOT, 'README.md');

  writeFile(target, result);

  success('All done!');
})();
