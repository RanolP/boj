import { exists, readFile, writeFile } from '../src/better-fs';
import { ROOT } from '../src/constants';
import { join } from 'path';
import { preprocess, RootRuleset, NoteRuleset } from '../src/pgfm';
import { chalk, Logger } from '../src/util/console';
import { getProblemList } from '../src/problem';

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
    const noteSourceFile = join(ROOT, problem.id.toString(), 'Note.md');
    if (!(await exists(noteSourceFile))) {
      log(chalk.yellow, 'Note not found, pass.');
      continue;
    }
    const noteTemplate = await readFile(noteSourceFile, {
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
