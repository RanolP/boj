"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const better_fs_1 = require("../lib/better-fs");
const console_1 = require("../util/console");
const problem_1 = require("../lib/problem");
const baekjoon_1 = require("../api/baekjoon");
const align_1 = require("../util/align");
const command_1 = require("@oclif/command");
class AnalyzeCommand extends command_1.Command {
    async run() {
        const base = new console_1.Logger('analyze');
        const problemList = await problem_1.getProblemList({ sorted: true });
        const tagged = (await Promise.all(problemList.map(async (it) => {
            if (!it.isSolved) {
                return [[it, 'Not solved']];
            }
            if (await better_fs_1.notExists(it.noteFile)) {
                return [[it, 'Note not found']];
            }
            return [];
        }))).flat();
        const title = align_1.aligned(await Promise.all(tagged.map(([it]) => baekjoon_1.fetchProblemTitle(it.id))), align_1.stringify);
        const problemLoggers = base.labeled(tagged.map(([it]) => it.id), console_1.chalk.yellow);
        for (const [index, [problem, message]] of Object.entries(tagged)) {
            const log = problemLoggers[problem.id];
            log(`${title[Number(index)]}  ${message}`);
        }
    }
}
exports.default = AnalyzeCommand;
AnalyzeCommand.description = 'Analyze problem status';
