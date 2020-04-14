import { symlink, exists, unlink, lstat, readlink } from '../src/better-fs';
import { getProblemList } from '../src/problem';
import { ROOT } from '../src/constants';
import { join, parse } from 'path';
import { blue, green, yellow, underline, gray } from 'chalk';
import { prompt } from 'inquirer';
import { chalk, Logger } from '../src/util/console';

(async () => {
  const problemList = await getProblemList();

  const base = new Logger('update-symlink');
  const problemLoggers = base.labeled(problemList.map((it) => it.id));

  for (const problem of problemList) {
    const log = problemLoggers[problem.id];

    if (!problem.isSolved) {
      log(chalk.yellow, 'Not solved, pass.');
      continue;
    }
    const solutions = await problem.getSolutions();
    let solution: string;
    if (solutions.length === 1) {
      solution = solutions[0];
    } else {
      solution = (
        await prompt({
          type: 'list',
          name: 'solution',
          message: 'What is the main solution file',
          choices: solutions,
        })
      ).solution;
    }
    const source = join(problem.id.toString(), solution);
    const target = join(
      ROOT,
      'P' + problem.id.toString() + parse(solution).ext
    );
    if (await exists(target)) {
      const fetchedStat = await lstat(target);
      if (fetchedStat.isSymbolicLink()) {
        const link = await readlink(target);
        if (link === source) {
          continue;
        }
      }
      const { overwrite } = await prompt({
        type: 'confirm',
        name: 'overwrite',
        message: `Would you overwrite ${target}?`,
      });
      if (overwrite) {
        await unlink(target);
      } else {
        log(chalk.yellow, 'Update passed.');
        continue;
      }
    }
    await symlink(source, target, 'file');
    log(blue, 'Updated.');
  }
})();
