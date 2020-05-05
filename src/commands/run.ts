import { copyFile, notExists, mkdirs } from '../lib/better-fs';
import { chalk, Logger } from '../util/console';
import { ROOT } from '../constants';
import { join, parse } from 'path';
import { Command } from '@oclif/command';
import { getProblemList, Problem } from '../lib/problem';
import { prompt } from '../vendors/inquirer';
import {
  fetchProblemTitle,
  AnswerResultColorSet,
  AnswerResultType,
} from '../api/baekjoon';
import { ExtensionLanguagesMap, Language, Runtime } from '../lib/language';
import { ShellCommand } from '../util/shell-command';
import { getConfig, FullOptionalMode } from '../config';

export default class RunCommand extends Command {
  public static description = 'Run solution file with like-oj environment';

  async run() {
    const base = new Logger('run');
    const { info, compile, execute } = base.labeled({
      info: chalk.blue,
      compile: chalk.cyan,
      execute: chalk.yellow,
    });

    const solutionList = (
      await getProblemList().then((it) =>
        Promise.all(
          it.map(async (problem) => {
            const title = await fetchProblemTitle(problem.id);
            const solutionList = await problem.getSolutionList();
            return solutionList.map(
              (solution) => [problem, title, solution] as const,
            );
          }),
        ),
      )
    ).flat();
    let [problem, title, solution] = (
      await prompt<{ select: [Problem, string, string] }>({
        type: 'list',
        name: 'select',
        message: 'Select a Solution to Run',
        choices: solutionList
          .filter(([problem, _title, _solution]) => !problem.isSolved)
          .map(([problem, title, solution]) => ({
            name: `${problem.id} ${title} - ${solution}`,
            value: [problem, title, solution],
          })),
      })
    ).select;

    const { ext } = parse(solution);
    const languageList = ExtensionLanguagesMap[ext];
    const language =
      languageList.length === 1
        ? languageList[0]
        : (
            await prompt<{ select: Language }>({
              type: 'list',
              name: 'select',
              message: 'Select a Language',
              choices: languageList.map((language) => ({
                name: language.name,
                value: language,
              })),
            })
          ).select;
    const config = await getConfig(FullOptionalMode);
    const override = config?.runtimeOverrides?.[language.id];
    const runtime =
      override?.compile && override?.execute
        ? undefined
        : language.bojRuntimes.length === 1
        ? language.bojRuntimes[0]
        : (override?.forceRuntime
            ? language.bojRuntimes.find(
                (it) => it.name === override.forceRuntime,
              )
            : undefined) ??
          (
            await prompt<{ select: Runtime }>({
              type: 'list',
              name: 'select',
              message: 'Select a Runtime',
              choices: language.bojRuntimes.map((runtime) => ({
                name: runtime.name,
                value: runtime,
              })),
            })
          ).select;

    info(
      `Run ${problem.id}/${solution} (for ${title}, on ${
        runtime ? runtime.name : 'Custom Runtime'
      })`,
    );
    const solutionFile = join(ROOT, problem.id.toString(), solution);
    const cwd = join(ROOT, '.boj-cache', 'run');
    if (await notExists(cwd)) {
      await mkdirs(cwd);
    }
    await copyFile(solutionFile, join(cwd, 'Main' + ext));
    compile('Start compiling...');

    const compileCommands =
      override?.compile ??
      (typeof runtime?.compileCommand === 'string'
        ? [runtime?.compileCommand]
        : runtime?.compileCommand);
    if (compileCommands?.filter(Boolean)) {
      for (const [index, command] of Object.entries(compileCommands)) {
        compile(
          `Running ${Number(index) + 1}/${compile.length}: ${chalk.yellow(
            command,
          )}`,
        );
        try {
          await ShellCommand.parse(command).executeInherit(cwd);
        } catch (e) {
          if (typeof e === 'number') {
            this.exit(e);
          }
          throw e;
        }
      }
    }
    execute('Start executing...');

    const executeCommands = (override?.execute ??
      (typeof runtime?.executeCommand === 'string'
        ? [runtime?.executeCommand]
        : runtime?.executeCommand)) as string[];
    for (const [index, command] of Object.entries(executeCommands)) {
      execute(
        `Running ${Number(index) + 1}/${execute.length}: ${chalk.yellow(
          command,
        )}`,
      );
      try {
        await ShellCommand.parse(command).executeInherit(cwd);
      } catch (e) {
        if (typeof e === 'number') {
          this.exit(e);
        }
        throw e;
      }
    }
  }
}
