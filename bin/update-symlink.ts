import { symlink, exists, unlink, lstat, readlink } from '../src/better-fs';
import { getProblemList } from '../src/problem';
import { ROOT } from '../src/constants';
import { join, parse, normalize, resolve } from 'path';
import {
  blue,
  green,
  yellow,
  bgBlue,
  white,
  bgGreen,
  bgYellow,
  underline,
  gray,
} from 'chalk';
import { prompt } from 'inquirer';

(async () => {
  const problemList = await getProblemList();
  const maxLen = problemList
    .map((it) => it.id.toString().length)
    .reduce((prev, curr) => (prev < curr ? curr : prev), 0);
  for (const problem of problemList) {
    const label =
      gray('[update-symlink] > ') +
      underline(problem.id) +
      ' '.repeat(maxLen - problem.id.toString().length + 1);

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
          console.log(green(label) + ' Already up-to-date.');
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
        console.log(yellow(label) + ' Update passed.');
        continue;
      }
    }
    await symlink(source, target, 'file');
    console.log(blue(label) + ' Updated.');
  }
})();
