import { fetchProblemTitle } from '../api/baekjoon';
import { prompt } from '../vendors/inquirer';
import { Logger, chalk } from '../util/console';
import { Command, flags } from '@oclif/command';
import playwright, { Request, JSHandle } from 'playwright';
import { getSettings } from '../config';
import { getProblemList, Problem } from '../lib/problem';
import { ROOT } from '../constants';
import { join, parse } from 'path';
import {
  ExtensionLanguagesMap,
  Runtime,
  RuntimeBelongsToMap,
} from '../util/language';
import { readFile } from '../lib/better-fs';

enum AnswerResultType {
  Waiting = 0,
  RejudgeWaiting = 1,
  Compiling = 2,
  Judging = 3,
  Accepted = 4,
  PE = 5,
  WrongAnswer = 6,
  TimeLimitExceeded = 7,
  MemoryLimitExceeded = 8,
  OutputLimitExceeded = 9,
  RuntimeError = 10,
  CompileError = 11,
  CannotJudge = 12,
  Deleted = 13,
  JudgeDelaying = 14,
  PartiallyAccepted = 15,
}

const AnswerResultColorSet: Record<
  AnswerResultType,
  (text: string) => string
> = {
  [AnswerResultType.Waiting]: chalk.hex('#a49e9e'),
  [AnswerResultType.RejudgeWaiting]: chalk.hex('#a49e9e'),
  [AnswerResultType.Compiling]: chalk.hex('#e67e22'),
  [AnswerResultType.Judging]: chalk.hex('#e67e22'),
  [AnswerResultType.Accepted]: chalk.hex('#009874').bold,
  [AnswerResultType.PE]: chalk.hex('#fa7268'),
  [AnswerResultType.WrongAnswer]: chalk.hex('#dd4124'),
  [AnswerResultType.TimeLimitExceeded]: chalk.hex('#fa7268'),
  [AnswerResultType.MemoryLimitExceeded]: chalk.hex('#fa7268'),
  [AnswerResultType.OutputLimitExceeded]: chalk.hex('#fa7268'),
  [AnswerResultType.RuntimeError]: chalk.hex('#5f4b8b'),
  [AnswerResultType.CompileError]: chalk.hex('#0f4c81'),
  [AnswerResultType.CannotJudge]: chalk.black.strikethrough,
  [AnswerResultType.Deleted]: chalk.black.strikethrough,
  [AnswerResultType.JudgeDelaying]: chalk.hex('#e67e22'),
  [AnswerResultType.PartiallyAccepted]: chalk.hex('#efc050').bold,
};

const AnswerResultLabelSet: Record<AnswerResultType, string> = {
  [AnswerResultType.Waiting]: '기다리는 중',
  [AnswerResultType.RejudgeWaiting]: '재채점을 기다리는 중',
  [AnswerResultType.Compiling]: '채점 준비 중',
  [AnswerResultType.Judging]: '채점 중',
  [AnswerResultType.Accepted]: '맞았습니다!!',
  [AnswerResultType.PE]: '출력 형식이 잘못되었습니다',
  [AnswerResultType.WrongAnswer]: '틀렸습니다',
  [AnswerResultType.TimeLimitExceeded]: '시간 초과',
  [AnswerResultType.MemoryLimitExceeded]: '메모리 초과',
  [AnswerResultType.OutputLimitExceeded]: '출력 초과',
  [AnswerResultType.RuntimeError]: '런타임 에러',
  [AnswerResultType.CompileError]: '컴파일 에러',
  [AnswerResultType.CannotJudge]: '채점 불가',
  [AnswerResultType.Deleted]: '삭제된 제출',
  [AnswerResultType.JudgeDelaying]: '%(remain)초 후 채점 시작',
  [AnswerResultType.PartiallyAccepted]: '맞았습니다!!',
};

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
      result: AnswerResultType.JudgeDelaying;
      remain?: number;
    });

export default class SolveCommand extends Command {
  public static description = 'Initialize problem';

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

    const settings = await getSettings(error);
    if (!settings) {
      return;
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
    const browser = await browserType.launchPersistentContext(
      join(ROOT, '.boj-cache'),
      {
        headless: !head,
      },
    );
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
        `Timeout. You can try with ${chalk.yellow(
          '--head',
        )} flag to show the browser.`,
      );
      return;
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
      error('Button fetch failed.');
      return;
    }
    await page.waitFor(1000);
    let tries = 0;
    while (tries < 5) {
      try {
        await element?.asElement()?.click({
          timeout: 10 * 1000,
        });
        break;
      } catch {}
      tries += 1;
      info(`Tried ${tries} times...`);
    }
    if (tries === 5) {
      error('Fetch failed.');
      return;
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
        `There are no selectable runtime found. Found solution file(s): ${solutionList.join(
          ', ',
        )}`,
      );
      return;
    }
    let runtime: Runtime;

    if (usableRuntimes.length > 1) {
      runtime = (
        await prompt<{ runtime: Runtime }>({
          type: 'list',
          name: 'runtime',
          message: 'Select runtime',
          choices: usableRuntimes.map((it) => ({
            name: `${it.name} ${it.version ? ` ${it.version}` : ''}`,
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

    const input = (await page.$('.CodeMirror'))!;
    await input.click();
    await input.focus();
    await input.type(solutionSource);
    await page.click('#submit_button');

    await page.waitForNavigation({
      waitUntil: 'load',
      timeout: 0,
    });
    let start: number = -1;
    await page.exposeFunction(
      'display_solution',
      (solutionId: number, ans: any) => {
        if (start < 0) {
          start = Date.now();
        }
        render(solutionId, ans, start);
      },
    );

    // await browser.close();
  }
}

function render(solutionId: number, answer: Answer, startTime: number) {
  const color = AnswerResultColorSet[answer.result];
  const label = AnswerResultLabelSet[answer.result];
  let to_print = [label];

  let progress = 0;
  if (answer.progress) {
    progress = answer.progress;
    if (
      answer.result === AnswerResultType.Compiling ||
      answer.result === AnswerResultType.Judging
    ) {
      const now = Date.now();
      const timeSpentInSeconds = (now - startTime) / 1000;
      const leftProgress = 100 - progress;
      const estimateTime = leftProgress / (progress / timeSpentInSeconds);

      to_print.push(`(${progress}%, ${Math.round(estimateTime)}초)`);
    } else {
      to_print.push(`(${progress}%)`);
    }
  }
  if (answer.result === AnswerResultType.WrongAnswer && answer.feedback) {
    to_print.push(`[${answer.feedback}]`);
  }
  if (answer.result === AnswerResultType.JudgeDelaying) {
    const remain = answer.remain ?? 0;
    to_print[0] = to_print[0].replace('%(remain)', remain.toString());
  }

  let r = '';
  if (answer.result === AnswerResultType.CompileError) {
    r += `<a href="/ceinfo/${solutionId}">`;
  }
  if (answer.partial_score) {
    r += `${Math.round(answer.partial_score * 100) / 100}점`;
  } else if (answer.subtask_score) {
    r += `${answer.subtask_score}점`;
  } else {
    if (answer.custom_result) {
      r += answer.custom_result;
    } else {
      r += to_print.join(' ');
      if (answer.ac && answer.tot && answer.ac > 0 && answer.tot > 0) {
        r += ` (${answer.ac}/${answer.tot})`;
      }
    }
  }

  if (answer.result === AnswerResultType.CompileError) {
    r += '</a>';
  }

  console.log(color(r));

  if (answer.memory) {
    console.log(`Memory  ${answer.memory}`);
  }
  if (answer.time) {
    console.log(`Time    ${answer.time}`);
  }
}
