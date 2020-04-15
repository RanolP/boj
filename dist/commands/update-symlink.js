"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const better_fs_1 = require("../lib/better-fs");
const problem_1 = require("../lib/problem");
const constants_1 = require("../constants");
const path_1 = require("path");
const chalk_1 = require("chalk");
const inquirer_1 = require("inquirer");
const console_1 = require("../util/console");
const command_1 = require("@oclif/command");
class InitCommand extends command_1.Command {
    async run() {
        const problemList = await problem_1.getProblemList();
        const base = new console_1.Logger('update-symlink');
        const problemLoggers = base.labeled(problemList.map((it) => it.id));
        for (const problem of problemList) {
            const log = problemLoggers[problem.id];
            if (!problem.isSolved) {
                log(console_1.chalk.yellow, 'Not solved, pass.');
                continue;
            }
            const solutions = await problem.getSolutions();
            let solution;
            if (solutions.length === 1) {
                solution = solutions[0];
            }
            else {
                solution = (await inquirer_1.prompt({
                    type: 'list',
                    name: 'solution',
                    message: 'What is the main solution file',
                    choices: solutions,
                })).solution;
            }
            const source = path_1.join(problem.id.toString(), solution);
            const target = path_1.join(constants_1.ROOT, 'P' + problem.id.toString() + path_1.parse(solution).ext);
            if (await better_fs_1.exists(target)) {
                const fetchedStat = await better_fs_1.lstat(target);
                if (fetchedStat.isSymbolicLink()) {
                    const link = await better_fs_1.readlink(target);
                    if (link === source) {
                        continue;
                    }
                }
                const { overwrite } = await inquirer_1.prompt({
                    type: 'confirm',
                    name: 'overwrite',
                    message: `Would you overwrite ${target}?`,
                });
                if (overwrite) {
                    await better_fs_1.unlink(target);
                }
                else {
                    log(console_1.chalk.yellow, 'Update passed.');
                    continue;
                }
            }
            await better_fs_1.symlink(source, target, 'file');
            log(chalk_1.blue, 'Updated.');
        }
    }
}
exports.default = InitCommand;
InitCommand.description = 'Initialize sezong.config.json';
