import {
  fetchProblemTitle,
  AnswerResultColorSet,
  AnswerResultLabelSet,
  AnswerResultType,
} from '../api/baekjoon';
import { prompt } from '../vendors/inquirer';
import { Logger, chalk } from '../util/console';
import { Command, flags } from '@oclif/command';
import playwright, { JSHandle } from 'playwright';
import { getConfig, BrowserMode } from '../config';
import { getProblemList, Problem } from '../lib/problem';
import { ROOT } from '../constants';
import { join, parse } from 'path';
import {
  ExtensionLanguagesMap,
  Runtime,
  RuntimeBelongsToMap,
} from '../lib/language';
import { readFile, mkdirs, notExists } from '../lib/better-fs';
import ProgressBar from 'progress';
import { Chalk } from 'chalk';
import terminalLink from 'terminal-link';
import { formatDate } from '../util/date';
import fetch from 'node-fetch';

function hasProgressbar(
  result: AnswerResultType,
): result is AnswerResultType.Compiling | AnswerResultType.Judging {
  switch (result) {
    case AnswerResultType.Compiling:
    case AnswerResultType.Judging:
      return true;
    default:
      return false;
  }
}

type ToContinue = boolean;
type Accepted = boolean;

type AnswerBase = {
  result: AnswerResultType;
  progress?: number;
  memory?: number;
  time?: number;
  partial_score?: number;
  subtask_score?: number;
  feedback?: string;
  remain?: number;
  custom_result?: string;
  ac?: number;
  tot?: number;
};

type Answer =
  | AnswerBase
  | (AnswerBase & {
      result: AnswerResultType.Judging;
      progress: number;
    })
  | (AnswerBase & {
      result: AnswerResultType.Accepted;
      memory: number;
      time: number;
    })
  | (AnswerBase & {
      result: AnswerResultType.JudgeDelaying;
      remain?: number;
    })
  | (AnswerBase & {
      result: AnswerResultType.WrongAnswer;
      feedback?: string;
    })
  | (AnswerBase & {
      result: AnswerResultType.Judging;
      remain?: number;
    });

export default class SolveCommand extends Command {
  public static description =
    'Submit to baekjoon, and marks as solved if accepted';

  public static flags = {
    head: flags.boolean({
      description: 'Wheater not to launch headless browser or not',
    }),
  };
  async run() {
    const base = new Logger('solve');
    const { error, info } = base.labeled({
      error: chalk.red,
      info: chalk.blue,
    });

    const settings = await getConfig(BrowserMode, error);
    if (!settings) {
      this.exit(1);
    }

    const problems = await getProblemList().then((it) =>
      Promise.all(
        it.map(
          async (problem) =>
            [
              problem,
              await fetchProblemTitle(problem.id),
              await problem.getSolutionList(),
            ] as const,
        ),
      ),
    );
    let [problem, solutionList] = (
      await prompt<{ select: [Problem, string[]] }>({
        type: 'list',
        name: 'select',
        message: 'Select a Problem to Solve',
        choices: problems
          .filter(
            ([problem, _, solutionList]) =>
              !problem.isSolved && solutionList.length > 0,
          )
          .map(([problem, title, solutions]) => ({
            name: `${problem.id} ${title}`,
            value: [problem, solutions],
          })),
      })
    ).select;

    const head = this.parse(SolveCommand).flags.head;

    info(
      `Opening a new ${settings.browser}... (${
        head ? 'with GUI' : 'Headless'
      })`,
    );
    const browserType = playwright[settings.browser];

    const folder = join(ROOT, '.boj-cache', 'browser', settings.browser);
    if (await notExists(folder)) {
      await mkdirs(folder);
    }
    const browser = await browserType.launchPersistentContext(folder, {
      headless: !head,
    });
    const page = await browser.newPage();
    await page.goto(
      `https://www.acmicpc.net/login?next=%2Fproblem%2F${problem.id}`,
      {
        timeout: 0,
      },
    );
    info(`Waiting for login... (Please login in 10 minute)`);
    // Logout button appears
    try {
      await page.waitForSelector('.loginbar>:nth-child(7)', {
        waitFor: 'attached',
        timeout: 10 * 60 * 1000,
      });
    } catch {
      error(
        `Timeout. You can retry with ${chalk.yellow(
          '--head',
        )} flag to show the browser.`,
      );
      await browser.close();
      this.exit(1);
    }
    const id = await page.$eval(
      '.loginbar > :first-child > a',
      (element) => element.innerHTML,
    );
    info(`It looks like you've completed login. You are "${id}".`);
    await page.goto(`https://www.acmicpc.net/submit/${problem.id}`, {
      timeout: 0,
    });
    info('Fetch selectable runtimes...');
    let element: JSHandle | null;
    try {
      element = await page.waitFor('#language_chosen', {
        timeout: 30 * 1000,
      });
    } catch {
      error('Button fetch failed. Please retry.');
      await browser.close();
      this.exit(1);
      return;
    }
    await page.waitFor(1000);
    try {
      await element?.asElement()?.click({
        timeout: 10 * 1000,
      });
    } catch {
      error('Runtime fetch failed. Please retry.');
      await browser.close();
      this.exit(1);
    }
    await page.waitFor('.chosen-drop > .chosen-results > li', {
      timeout: 0,
    });
    const buttonList = await page.$$('.chosen-drop > .chosen-results > li');
    const availableRuntimes = new Set(
      await Promise.all(
        buttonList.map((handle) =>
          handle.evaluate((element) => element.innerHTML),
        ),
      ),
    );
    info(`Fetched ${availableRuntimes.size} runtimes.`);
    const usableRuntimes = solutionList
      .flatMap((solution) => ExtensionLanguagesMap[parse(solution).ext])
      .flatMap((it) => it.bojRuntimes)
      .filter((it) => availableRuntimes.has(it.name));
    if (usableRuntimes.length === 0) {
      error(
        `There are no selectable runtime found.\nFound solution file(s): ${solutionList.join(
          ', ',
        )}\nAvailable runtimes: ${[...availableRuntimes].join(', ')}`,
      );
      await browser.close();
      this.exit(1);
    }
    let runtime: Runtime;

    if (usableRuntimes.length > 1) {
      runtime = (
        await prompt<{ runtime: Runtime }>({
          type: 'list',
          name: 'runtime',
          message: 'Select runtime',
          choices: usableRuntimes.map((it) => ({
            name: it.name,
            value: it,
            short: it.name,
          })),
        })
      ).runtime;
    } else {
      runtime = usableRuntimes[0];
      info(`Using runtime ${runtime.name} (The only one)`);
    }

    const usableSolutionList = solutionList.filter((it) =>
      it.endsWith(RuntimeBelongsToMap[runtime.name].fileExtension),
    );
    let solutionFile: string;
    if (usableSolutionList.length > 1) {
      solutionFile = (
        await prompt<{ solutionFile: string }>({
          type: 'list',
          name: 'solutionFile',
          message: 'Select solution file',
          choices: usableSolutionList,
        })
      ).solutionFile;
    } else {
      solutionFile = usableSolutionList[0];
      info(`Using solution ${solutionFile} (The only one)`);
    }
    const solutionSource = await readFile(
      join(ROOT, problem.id.toString(), solutionFile),
      { encoding: 'utf-8' },
    );

    await Promise.all(
      buttonList.map(async (handle) => {
        return [
          handle,
          await handle.evaluate((element) => element.innerHTML),
        ] as const;
      }),
    ).then(async (buttons) => {
      const found = buttons.find(([_, inner]) => inner === runtime.name);
      if (found) {
        await found[0].click();
      }
    });

    let isFirstPacket = true;
    let toContinue: ToContinue = true;
    let accepted: boolean = false;
    const progressBar = new ProgressBar(
      `:label  :bar  ${chalk.magenta(':percent')} ${chalk.blue(':eta초')}`,
      {
        complete: chalk.yellow('━'),
        incomplete: chalk.gray('━'),
        width: 40,
        total: 100,
      },
    );

    const acceptSolution = (solutionId: number, answer: any) => {
      if (!toContinue) {
        return;
      }
      const renderResult = render(solutionId, answer, progressBar);
      toContinue = toContinue && renderResult[0];
      accepted = accepted || renderResult[1];
      if (isFirstPacket) {
        isFirstPacket = false;
      }
    };

    info(`Code size: ${solutionSource.length}B, Submitting...`);

    const input = (await page.$('.CodeMirror'))!;
    await input.click();
    await input.focus();
    await page.keyboard.insertText(solutionSource);
    await page.click('#submit_button');

    info(`Code submitted.`);

    await page.waitForNavigation({
      waitUntil: 'load',
      timeout: 0,
    });
    await page.exposeFunction(
      'display_solution',
      (solutionId: number, answer: any) => acceptSolution(solutionId, answer),
    );

    page
      .waitForSelector('#status-table tbody tr', {
        timeout: 0,
      })
      .then((element) =>
        element!.evaluate((jsHandle) => jsHandle.id.substring(9)),
      )
      .then((solutionId) =>
        fetch('https://www.acmicpc.net/status/ajax', {
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: `solution_id=${solutionId}`,
          method: 'POST',
        })
          .then((response) => response.json())
          .then((answer) => {
            if (isFirstPacket) {
              acceptSolution(Number(solutionId), answer);
            }
          }),
      );

    while (toContinue) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (toContinue && progressBar.curr > 0 && !progressBar.complete) {
        progressBar.render();
      }
    }

    await browser.close();

    if (accepted && !problem.isSolved) {
      const { toMarkSolved } = await prompt({
        type: 'confirm',
        name: 'toMarkSolved',
        message: `Would you mark ${problem.id} as solved?`,
      });
      if (toMarkSolved) {
        problem.meta.status = 'solved';
        const now = new Date();
        problem.meta.solvedDate = formatDate(now);
        await problem.saveMeta();
      }
    }
  }
}

function render(
  solutionId: number,
  answer: Answer,
  progressBar: ProgressBar,
): [ToContinue, Accepted] {
  const result = Number(answer.result) as AnswerResultType;

  const color = AnswerResultColorSet[result];
  const label = AnswerResultLabelSet[result];
  let to_print = [label];

  if (result === AnswerResultType.WrongAnswer && answer.feedback) {
    to_print.push(`[${answer.feedback}]`);
  }
  if (result === AnswerResultType.JudgeDelaying) {
    const remain = answer.remain ?? 0;
    to_print[0] = to_print[0].replace('%(remain)', remain.toString());
  }

  let toRender: string;
  if (answer.partial_score) {
    toRender = `${Math.round(answer.partial_score * 100) / 100}점`;
  } else if (answer.subtask_score) {
    toRender = `${answer.subtask_score}점`;
  } else if (answer.custom_result) {
    toRender = answer.custom_result;
  } else {
    toRender = to_print.join(' ');
    if (answer.ac && answer.tot && answer.ac > 0 && answer.tot > 0) {
      toRender += ` (${answer.ac}/${answer.tot})`;
    }
  }

  if (result === AnswerResultType.CompileError) {
    toRender = terminalLink(
      toRender,
      `https://acmicpc.net/ceinfo/${solutionId}`,
    );
  }

  if (answer.progress) {
    progressBar.update(answer.progress / 100, {
      label: color(toRender),
    });
  } else {
    console.log(color(toRender));
  }

  if (answer.memory) {
    console.log(
      `${chalk.underline(chalk.magenta('Memory'))}  ${answer.memory}kB`,
    );
  }
  if (answer.time) {
    console.log(`${chalk.underline(chalk.yellow('Time'))}    ${answer.time}ms`);
  }

  switch (result) {
    case AnswerResultType.Waiting:
    case AnswerResultType.RejudgeWaiting:
    case AnswerResultType.Compiling:
    case AnswerResultType.Judging:
    case AnswerResultType.JudgeDelaying:
      return [true, false];
    default:
      return [
        false,
        result === AnswerResultType.Accepted ||
          result === AnswerResultType.PartiallyAccepted,
      ];
  }
}
