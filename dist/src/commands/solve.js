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
const language_1 = require("../lib/language");
const better_fs_1 = require("../lib/better-fs");
const progress_1 = __importDefault(require("progress"));
const terminal_link_1 = __importDefault(require("terminal-link"));
const date_1 = require("../util/date");
const node_fetch_1 = __importDefault(require("node-fetch"));
function hasProgressbar(result) {
    switch (result) {
        case baekjoon_1.AnswerResultType.Compiling:
        case baekjoon_1.AnswerResultType.Judging:
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
        const settings = await config_1.getConfig(config_1.BrowserMode, error);
        if (!settings) {
            this.exit(1);
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
            error(`Timeout. You can retry with ${console_1.chalk.yellow('--head')} flag to show the browser.`);
            await browser.close();
            this.exit(1);
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
            error('Button fetch failed. Please retry.');
            await browser.close();
            this.exit(1);
            return;
        }
        await page.waitFor(1000);
        try {
            await ((_a = element === null || element === void 0 ? void 0 : element.asElement()) === null || _a === void 0 ? void 0 : _a.click({
                timeout: 10 * 1000,
            }));
        }
        catch (_d) {
            error('Runtime fetch failed. Please retry.');
            await browser.close();
            this.exit(1);
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
            error(`There are no selectable runtime found.\nFound solution file(s): ${solutionList.join(', ')}\nAvailable runtimes: ${[...availableRuntimes].join(', ')}`);
            await browser.close();
            this.exit(1);
        }
        let runtime;
        if (usableRuntimes.length > 1) {
            runtime = (await inquirer_1.prompt({
                type: 'list',
                name: 'runtime',
                message: 'Select runtime',
                choices: usableRuntimes.map((it) => ({
                    name: it.name,
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
        let isFirstPacket = true;
        let toContinue = true;
        let accepted = false;
        const progressBar = new progress_1.default(`:label  :bar  ${console_1.chalk.magenta(':percent')} ${console_1.chalk.blue(':eta초')}`, {
            complete: console_1.chalk.yellow('━'),
            incomplete: console_1.chalk.gray('━'),
            width: 40,
            total: 100,
        });
        const acceptSolution = (solutionId, answer) => {
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
        const input = (await page.$('.CodeMirror'));
        await input.click();
        await input.focus();
        await page.keyboard.insertText(solutionSource);
        await page.click('#submit_button');
        info(`Code submitted.`);
        await page.waitForNavigation({
            waitUntil: 'load',
            timeout: 0,
        });
        await page.exposeFunction('display_solution', (solutionId, answer) => acceptSolution(solutionId, answer));
        page
            .waitForSelector('#status-table tbody tr', {
            timeout: 0,
        })
            .then((element) => element.evaluate((jsHandle) => jsHandle.id.substring(9)))
            .then((solutionId) => node_fetch_1.default('https://www.acmicpc.net/status/ajax', {
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
        }));
        while (toContinue) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (toContinue && progressBar.curr > 0 && !progressBar.complete) {
                progressBar.render();
            }
        }
        await browser.close();
        if (accepted && !problem.isSolved) {
            const { toMarkSolved } = await inquirer_1.prompt({
                type: 'confirm',
                name: 'toMarkSolved',
                message: `Would you mark ${problem.id} as solved?`,
            });
            if (toMarkSolved) {
                problem.meta.status = 'solved';
                const now = new Date();
                problem.meta.solvedDate = date_1.formatDate(now);
                await problem.saveMeta();
            }
        }
    }
}
exports.default = SolveCommand;
SolveCommand.description = 'Submit to baekjoon, and marks as solved if accepted';
SolveCommand.flags = {
    head: command_1.flags.boolean({
        description: 'Wheater not to launch headless browser or not',
    }),
};
function render(solutionId, answer, progressBar) {
    var _a;
    const result = Number(answer.result);
    const color = baekjoon_1.AnswerResultColorSet[result];
    const label = baekjoon_1.AnswerResultLabelSet[result];
    let to_print = [label];
    if (result === baekjoon_1.AnswerResultType.WrongAnswer && answer.feedback) {
        to_print.push(`[${answer.feedback}]`);
    }
    if (result === baekjoon_1.AnswerResultType.JudgeDelaying) {
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
    if (result === baekjoon_1.AnswerResultType.CompileError) {
        toRender = terminal_link_1.default(toRender, `https://acmicpc.net/ceinfo/${solutionId}`);
    }
    if (answer.progress) {
        progressBar.update(answer.progress / 100, {
            label: color(toRender),
        });
    }
    else {
        console.log(color(toRender));
    }
    if (answer.memory) {
        console.log(`${console_1.chalk.underline(console_1.chalk.magenta('Memory'))}  ${answer.memory}kB`);
    }
    if (answer.time) {
        console.log(`${console_1.chalk.underline(console_1.chalk.yellow('Time'))}    ${answer.time}ms`);
    }
    switch (result) {
        case baekjoon_1.AnswerResultType.Waiting:
        case baekjoon_1.AnswerResultType.RejudgeWaiting:
        case baekjoon_1.AnswerResultType.Compiling:
        case baekjoon_1.AnswerResultType.Judging:
        case baekjoon_1.AnswerResultType.JudgeDelaying:
            return [true, false];
        default:
            return [
                false,
                result === baekjoon_1.AnswerResultType.Accepted ||
                    result === baekjoon_1.AnswerResultType.PartiallyAccepted,
            ];
    }
}
