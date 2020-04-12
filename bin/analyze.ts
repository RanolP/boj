import { exists } from '../src/better-fs';
import { ROOT } from '../src/constants';
import { join } from 'path';
import { chalk, Logger } from '../src/util/console';
import { getProblemList } from '../src/problem';

(async () => {
  const base = new Logger('analyze');

  const problemList = await getProblemList();

  const problemLoggers = base.labeled(
    problemList.map((it) => it.id),
    chalk.yellow
  );

  for (const problem of problemList) {
    const log = problemLoggers[problem.id];
    if (!problem.isSolved) {
      log('Not solved.');
      continue;
    }
    if (!(await exists(problem.noteFile))) {
      log('Note not found.');
      continue;
    }
  }
})();
