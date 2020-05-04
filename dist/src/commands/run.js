"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const better_fs_1 = require("../lib/better-fs");
const console_1 = require("../util/console");
const constants_1 = require("../constants");
const path_1 = require("path");
const command_1 = require("@oclif/command");
const problem_1 = require("../lib/problem");
const inquirer_1 = require("../vendors/inquirer");
const baekjoon_1 = require("../api/baekjoon");
const language_1 = require("../lib/language");
const shell_command_1 = require("../util/shell-command");
const config_1 = require("../config");
class RunCommand extends command_1.Command {
    async run() {
        var _a, _b, _c, _d;
        const base = new console_1.Logger('run');
        const { info, compile, execute } = base.labeled({
            info: console_1.chalk.blue,
            compile: console_1.chalk.cyan,
            execute: console_1.chalk.yellow,
        });
        const solutionList = (await problem_1.getProblemList().then((it) => Promise.all(it.map(async (problem) => {
            const title = await baekjoon_1.fetchProblemTitle(problem.id);
            const solutionList = await problem.getSolutionList();
            return solutionList.map((solution) => [problem, title, solution]);
        })))).flat();
        let [problem, title, solution] = (await inquirer_1.prompt({
            type: 'list',
            name: 'select',
            message: 'Select a Solution to Run',
            choices: solutionList
                .filter(([problem, _title, _solution]) => !problem.isSolved)
                .map(([problem, title, solution]) => ({
                name: `${problem.id} ${title} - ${solution}`,
                value: [problem, title, solution],
            })),
        })).select;
        const { ext } = path_1.parse(solution);
        const languageList = language_1.ExtensionLanguagesMap[ext];
        const language = languageList.length === 1
            ? languageList[0]
            : (await inquirer_1.prompt({
                type: 'list',
                name: 'select',
                message: 'Select a Language',
                choices: languageList.map((language) => ({
                    name: language.name,
                    value: language,
                })),
            })).select;
        const config = await config_1.getConfig(config_1.FullOptionalMode);
        const override = (_a = config === null || config === void 0 ? void 0 : config.runtimeOverrides) === null || _a === void 0 ? void 0 : _a[language.id];
        const runtime = !(override === null || override === void 0 ? void 0 : override.compile) || !(override === null || override === void 0 ? void 0 : override.execute)
            ? language.bojRuntimes.length === 1
                ? language.bojRuntimes[0]
                : (_b = ((override === null || override === void 0 ? void 0 : override.forceRuntime) ? language.bojRuntimes.find((it) => it.name === override.forceRuntime)
                    : undefined)) !== null && _b !== void 0 ? _b : (await inquirer_1.prompt({
                    type: 'list',
                    name: 'select',
                    message: 'Select a Runtime',
                    choices: language.bojRuntimes.map((runtime) => ({
                        name: runtime.name,
                        value: runtime,
                    })),
                })).select
            : undefined;
        info(`Run ${problem.id}/${solution} (for ${title}, on ${runtime ? runtime.name : 'Custom Runtime'})`);
        const solutionFile = path_1.join(constants_1.ROOT, problem.id.toString(), solution);
        const cwd = path_1.join(constants_1.ROOT, '.boj-cache', 'run');
        if (await better_fs_1.notExists(cwd)) {
            await better_fs_1.mkdirs(cwd);
        }
        await better_fs_1.copyFile(solutionFile, path_1.join(cwd, 'Main' + ext));
        compile('Start compiling...');
        const compileCommands = (_c = override === null || override === void 0 ? void 0 : override.compile) !== null && _c !== void 0 ? _c : (typeof (runtime === null || runtime === void 0 ? void 0 : runtime.compileCommand) === 'string'
            ? [runtime === null || runtime === void 0 ? void 0 : runtime.compileCommand]
            : runtime === null || runtime === void 0 ? void 0 : runtime.compileCommand);
        if (compileCommands === null || compileCommands === void 0 ? void 0 : compileCommands.filter(Boolean)) {
            for (const [index, command] of Object.entries(compile)) {
                compile(`Running ${Number(index) + 1}/${compile.length}: ${console_1.chalk.yellow(command)}`);
                try {
                    await shell_command_1.ShellCommand.parse(command).executeInherit(cwd);
                }
                catch (e) {
                    if (typeof e === 'number') {
                        this.exit(e);
                    }
                    throw e;
                }
            }
        }
        execute('Start executing...');
        const executeCommands = ((_d = override === null || override === void 0 ? void 0 : override.execute) !== null && _d !== void 0 ? _d : (typeof (runtime === null || runtime === void 0 ? void 0 : runtime.executeCommand) === 'string'
            ? [runtime === null || runtime === void 0 ? void 0 : runtime.executeCommand]
            : runtime === null || runtime === void 0 ? void 0 : runtime.executeCommand));
        for (const [index, command] of Object.entries(executeCommands)) {
            execute(`Running ${Number(index) + 1}/${execute.length}: ${console_1.chalk.yellow(command)}`);
            try {
                await shell_command_1.ShellCommand.parse(command).executeInherit(cwd);
            }
            catch (e) {
                if (typeof e === 'number') {
                    this.exit(e);
                }
                throw e;
            }
        }
    }
}
exports.default = RunCommand;
RunCommand.description = 'Run solution file with like-oj environment';
