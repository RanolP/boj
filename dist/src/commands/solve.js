"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baekjoon_1 = require("../api/baekjoon");
const inquirer_1 = require("../vendors/inquirer");
const console_1 = require("../util/console");
const command_1 = require("@oclif/command");
const playwright_1 = __importDefault(require("playwright"));
const config_1 = require("../config");
const problem_1 = require("../lib/problem");
const constants_1 = require("../constants");
const path_1 = require("path");
const language_1 = require("../util/language");
const better_fs_1 = require("../lib/better-fs");
const progress_1 = __importDefault(require("progress"));
const terminal_link_1 = __importDefault(require("terminal-link"));
var AnswerResultType;
(function (AnswerResultType) {
    AnswerResultType[AnswerResultType["Waiting"] = 0] = "Waiting";
    AnswerResultType[AnswerResultType["RejudgeWaiting"] = 1] = "RejudgeWaiting";
    AnswerResultType[AnswerResultType["Compiling"] = 2] = "Compiling";
    AnswerResultType[AnswerResultType["Judging"] = 3] = "Judging";
    AnswerResultType[AnswerResultType["Accepted"] = 4] = "Accepted";
    AnswerResultType[AnswerResultType["PE"] = 5] = "PE";
    AnswerResultType[AnswerResultType["WrongAnswer"] = 6] = "WrongAnswer";
    AnswerResultType[AnswerResultType["TimeLimitExceeded"] = 7] = "TimeLimitExceeded";
    AnswerResultType[AnswerResultType["MemoryLimitExceeded"] = 8] = "MemoryLimitExceeded";
    AnswerResultType[AnswerResultType["OutputLimitExceeded"] = 9] = "OutputLimitExceeded";
    AnswerResultType[AnswerResultType["RuntimeError"] = 10] = "RuntimeError";
    AnswerResultType[AnswerResultType["CompileError"] = 11] = "CompileError";
    AnswerResultType[AnswerResultType["CannotJudge"] = 12] = "CannotJudge";
    AnswerResultType[AnswerResultType["Deleted"] = 13] = "Deleted";
    AnswerResultType[AnswerResultType["JudgeDelaying"] = 14] = "JudgeDelaying";
    AnswerResultType[AnswerResultType["PartiallyAccepted"] = 15] = "PartiallyAccepted";
})(AnswerResultType || (AnswerResultType = {}));
const AnswerResultColorSet = {
    [AnswerResultType.Waiting]: console_1.chalk.hex('#a49e9e'),
    [AnswerResultType.RejudgeWaiting]: console_1.chalk.hex('#a49e9e'),
    [AnswerResultType.Compiling]: console_1.chalk.hex('#e67e22'),
    [AnswerResultType.Judging]: console_1.chalk.hex('#e67e22'),
    [AnswerResultType.Accepted]: console_1.chalk.hex('#009874').bold,
    [AnswerResultType.PE]: console_1.chalk.hex('#fa7268'),
    [AnswerResultType.WrongAnswer]: console_1.chalk.hex('#dd4124'),
    [AnswerResultType.TimeLimitExceeded]: console_1.chalk.hex('#fa7268'),
    [AnswerResultType.MemoryLimitExceeded]: console_1.chalk.hex('#fa7268'),
    [AnswerResultType.OutputLimitExceeded]: console_1.chalk.hex('#fa7268'),
    [AnswerResultType.RuntimeError]: console_1.chalk.hex('#5f4b8b'),
    [AnswerResultType.CompileError]: console_1.chalk.hex('#0f4c81'),
    [AnswerResultType.CannotJudge]: console_1.chalk.black.strikethrough,
    [AnswerResultType.Deleted]: console_1.chalk.black.strikethrough,
    [AnswerResultType.JudgeDelaying]: console_1.chalk.hex('#e67e22'),
    [AnswerResultType.PartiallyAccepted]: console_1.chalk.hex('#efc050').bold,
};
const AnswerResultLabelSet = {
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
function hasProgressbar(result) {
    switch (result) {
        case AnswerResultType.Compiling:
        case AnswerResultType.Judging:
            return true;
        default:
            return false;
    }
}
class SolveCommand extends command_1.Command {
    async run() {
        var _a;
        const base = new console_1.Logger('solve');
        const { error, info } = base.labeled({
            error: console_1.chalk.red,
            info: console_1.chalk.blue,
        });
        const settings = await config_1.getSettings(error);
        if (!settings) {
            return;
        }
        const problems = await problem_1.getProblemList().then((it) => Promise.all(it.map(async (problem) => [
            problem,
            await baekjoon_1.fetchProblemTitle(problem.id),
            await problem.getSolutionList(),
        ])));
        let [problem, solutionList] = (await inquirer_1.prompt({
            type: 'list',
            name: 'select',
            message: 'Select a Problem to Solve',
            choices: problems
                .filter(([problem, _, solutionList]) => !problem.isSolved && solutionList.length > 0)
                .map(([problem, title, solutions]) => ({
                name: `${problem.id} ${title}`,
                value: [problem, solutions],
            })),
        })).select;
        const head = this.parse(SolveCommand).flags.head;
        info(`Opening a new ${settings.browser}... (${head ? 'with GUI' : 'Headless'})`);
        const browserType = playwright_1.default[settings.browser];
        const folder = path_1.join(constants_1.ROOT, '.boj-cache', 'browser', settings.browser);
        if (await better_fs_1.notExists(folder)) {
            await better_fs_1.mkdirs(folder);
        }
        const browser = await browserType.launchPersistentContext(folder, {
            headless: !head,
        });
        const page = await browser.newPage();
        await page.goto(`https://www.acmicpc.net/login?next=%2Fproblem%2F${problem.id}`, {
            timeout: 0,
        });
        info(`Waiting for login... (Please login in 10 minute)`);
        // Logout button appears
        try {
            await page.waitForSelector('.loginbar>:nth-child(7)', {
                waitFor: 'attached',
                timeout: 10 * 60 * 1000,
            });
        }
        catch (_b) {
            error(`Timeout. You can try with ${console_1.chalk.yellow('--head')} flag to show the browser.`);
            await browser.close();
            return;
        }
        const id = await page.$eval('.loginbar > :first-child > a', (element) => element.innerHTML);
        info(`It looks like you've completed login. You are "${id}".`);
        await page.goto(`https://www.acmicpc.net/submit/${problem.id}`, {
            timeout: 0,
        });
        info('Fetch selectable runtimes...');
        let element;
        try {
            element = await page.waitFor('#language_chosen', {
                timeout: 30 * 1000,
            });
        }
        catch (_c) {
            error('Button fetch failed.');
            await browser.close();
            return;
        }
        await page.waitFor(1000);
        let tries = 0;
        while (tries < 5) {
            try {
                await ((_a = element === null || element === void 0 ? void 0 : element.asElement()) === null || _a === void 0 ? void 0 : _a.click({
                    timeout: 10 * 1000,
                }));
                break;
            }
            catch (_d) { }
            tries += 1;
            info(`Tried ${tries} times...`);
        }
        if (tries === 5) {
            error('Runtime fetch failed.');
            await browser.close();
            return;
        }
        await page.waitFor('.chosen-drop > .chosen-results > li', {
            timeout: 0,
        });
        const buttonList = await page.$$('.chosen-drop > .chosen-results > li');
        const availableRuntimes = new Set(await Promise.all(buttonList.map((handle) => handle.evaluate((element) => element.innerHTML))));
        info(`Fetched ${availableRuntimes.size} runtimes.`);
        const usableRuntimes = solutionList
            .flatMap((solution) => language_1.ExtensionLanguagesMap[path_1.parse(solution).ext])
            .flatMap((it) => it.bojRuntimes)
            .filter((it) => availableRuntimes.has(it.name));
        if (usableRuntimes.length === 0) {
            error(`There are no selectable runtime found. Found solution file(s): ${solutionList.join(', ')}`);
            await browser.close();
            return;
        }
        let runtime;
        if (usableRuntimes.length > 1) {
            runtime = (await inquirer_1.prompt({
                type: 'list',
                name: 'runtime',
                message: 'Select runtime',
                choices: usableRuntimes.map((it) => ({
                    name: `${it.name} ${it.version ? ` ${it.version}` : ''}`,
                    value: it,
                    short: it.name,
                })),
            })).runtime;
        }
        else {
            runtime = usableRuntimes[0];
            info(`Using runtime ${runtime.name} (The only one)`);
        }
        const usableSolutionList = solutionList.filter((it) => it.endsWith(language_1.RuntimeBelongsToMap[runtime.name].fileExtension));
        let solutionFile;
        if (usableSolutionList.length > 1) {
            solutionFile = (await inquirer_1.prompt({
                type: 'list',
                name: 'solutionFile',
                message: 'Select solution file',
                choices: usableSolutionList,
            })).solutionFile;
        }
        else {
            solutionFile = usableSolutionList[0];
            info(`Using solution ${solutionFile} (The only one)`);
        }
        const solutionSource = await better_fs_1.readFile(path_1.join(constants_1.ROOT, problem.id.toString(), solutionFile), { encoding: 'utf-8' });
        await Promise.all(buttonList.map(async (handle) => {
            return [
                handle,
                await handle.evaluate((element) => element.innerHTML),
            ];
        })).then(async (buttons) => {
            const found = buttons.find(([_, inner]) => inner === runtime.name);
            if (found) {
                await found[0].click();
            }
        });
        const input = (await page.$('.CodeMirror'));
        await input.click();
        await input.focus();
        await page.keyboard.insertText(solutionSource);
        await page.click('#submit_button');
        await page.waitForNavigation({
            waitUntil: 'load',
            timeout: 0,
        });
        let isFirstPacket = true;
        let toContinue = true;
        const progressBar = new progress_1.default(`:label  :bar  ${console_1.chalk.magenta(':percent')} ${console_1.chalk.blue(':eta초')}`, {
            complete: console_1.chalk.yellow('━'),
            incomplete: console_1.chalk.gray('━'),
            width: 40,
            total: 100,
        });
        await page.exposeFunction('display_solution', (solutionId, ans) => {
            toContinue =
                toContinue && (isFirstPacket || render(solutionId, ans, progressBar));
            if (isFirstPacket) {
                isFirstPacket = false;
            }
        });
        while (toContinue) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        await browser.close();
    }
}
exports.default = SolveCommand;
SolveCommand.description = 'Initialize problem';
SolveCommand.flags = {
    head: command_1.flags.boolean({
        description: 'Wheater not to launch headless browser or not',
    }),
};
function render(solutionId, answer, progressBar) {
    var _a;
    const color = AnswerResultColorSet[answer.result];
    const label = AnswerResultLabelSet[answer.result];
    let to_print = [label];
    if (answer.result === AnswerResultType.WrongAnswer && answer.feedback) {
        to_print.push(`[${answer.feedback}]`);
    }
    if (answer.result === AnswerResultType.JudgeDelaying) {
        const remain = (_a = answer.remain) !== null && _a !== void 0 ? _a : 0;
        to_print[0] = to_print[0].replace('%(remain)', remain.toString());
    }
    let toRender;
    if (answer.partial_score) {
        toRender = `${Math.round(answer.partial_score * 100) / 100}점`;
    }
    else if (answer.subtask_score) {
        toRender = `${answer.subtask_score}점`;
    }
    else if (answer.custom_result) {
        toRender = answer.custom_result;
    }
    else {
        toRender = to_print.join(' ');
        if (answer.ac && answer.tot && answer.ac > 0 && answer.tot > 0) {
            toRender += ` (${answer.ac}/${answer.tot})`;
        }
    }
    if (answer.result === AnswerResultType.CompileError) {
        toRender = terminal_link_1.default(toRender, `https://acmicpc.net/ceinfo/${solutionId}`);
    }
    if (answer.progress) {
        progressBar.tick(answer.progress - progressBar.curr, {
            label: color(toRender),
        });
    }
    else {
        console.log(color(toRender));
    }
    if (answer.memory) {
        console.log(`Memory  ${answer.memory}`);
    }
    if (answer.time) {
        console.log(`Time    ${answer.time}`);
    }
    switch (answer.result) {
        case AnswerResultType.Waiting:
        case AnswerResultType.RejudgeWaiting:
        case AnswerResultType.Compiling:
        case AnswerResultType.Judging:
        case AnswerResultType.JudgeDelaying:
            return true;
        default:
            return false;
    }
}