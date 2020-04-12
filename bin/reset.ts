import { prompt } from 'inquirer';
import { Logger, chalk } from '../src/util/console';
import { getProblemList } from '../src/problem';
import { rimraf } from '../src/better-fs';
import { ROOT } from '../src/constants';
import { join } from 'path';

(async () => {
  const { warning } = new Logger('reset').labeled({
    warning: chalk.yellow,
  });
  const { reset } = await prompt({
    type: 'confirm',
    name: 'reset',
    message: `Would you reset whole repository?`,
  });
  if (!reset) {
    warning('Action aborted by user.');
    return;
  }
  const problemList = await getProblemList();
  for (const problem of problemList) {
    await rimraf(join(ROOT, problem.id.toString()));
  }
  await rimraf(join(ROOT, '.boj-cache'));
  await rimraf(join(ROOT, 'README.md'));
  await rimraf(ROOT, {
    file: (_, stat) => stat.isSymbolicLink(),
    folder: () => false,
  });
})();
