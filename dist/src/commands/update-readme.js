"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const better_fs_1 = require("../lib/better-fs");
const constants_1 = require("../constants");
const path_1 = require("path");
const pgfm_1 = require("../pgfm");
const console_1 = require("../util/console");
const problem_1 = require("../lib/problem");
const cache_1 = require("../cache");
const command_1 = require("@oclif/command");
async function getLastUpdate(path) {
    return (await better_fs_1.lstat(path)).mtime.toISOString();
}
const fetchLastNoteUpdate = cache_1.cached((problem) => getLastUpdate(problem.noteFile), (problem) => `${problem.id}/last-note-update`, cache_1.Duration.of({ day: 14 }));
const fetchLastReadMeUpdate = cache_1.cached(getLastUpdate, 'last-readme-update', cache_1.Duration.of({ day: 14 }));
const fetchLastProblemList = cache_1.cached(async () => (await problem_1.getProblemList()).map((problem) => problem.id), 'last-problem-list', cache_1.Duration.of({ day: 1 }));
class UpdateReadmeCommand extends command_1.Command {
    async run() {
        let force = this.parse(UpdateReadmeCommand).flags.force;
        const base = new console_1.Logger('update-readme');
        const problemList = await problem_1.getProblemList();
        const problemLoggers = base.labeled(problemList.map((it) => it.id), ['info', 'error', 'success']);
        const { info, error, success } = base.labeled({
            info: console_1.chalk.blue,
            error: console_1.chalk.red,
            success: console_1.chalk.green,
        }, problemList.map((it) => it.id));
        let problemUpdated = problemList.map((it) => it.id) != (await fetchLastProblemList());
        for (const problem of problemList) {
            const log = problemLoggers[problem.id];
            if (!problem.isSolved) {
                log(console_1.chalk.yellow, 'Not solved, pass.');
                continue;
            }
            if (await better_fs_1.notExists(problem.noteFile)) {
                log(console_1.chalk.yellow, 'Note not found, pass.');
                continue;
            }
            const lastUpdate = await fetchLastNoteUpdate(problem);
            if (!force &&
                lastUpdate.fetchKind === 'file' &&
                (await getLastUpdate(problem.noteFile)) == lastUpdate) {
                continue;
            }
            const noteTemplate = await better_fs_1.readFile(problem.noteFile, {
                encoding: 'utf-8',
            });
            const result = await pgfm_1.preprocess(noteTemplate, { problem }, pgfm_1.combineRuleset(pgfm_1.NoteRuleset, pgfm_1.AnyRuleset));
            const target = path_1.join(constants_1.ROOT, problem.id.toString(), 'README.md');
            better_fs_1.writeFile(target, result);
            log(console_1.chalk.green, 'Success.');
            await fetchLastNoteUpdate.force(problem);
            problemUpdated = true;
        }
        const templateFile = path_1.join(constants_1.ROOT, 'template', 'README.template.md');
        if (await better_fs_1.notExists(templateFile)) {
            error('File not found: template/README.template.md');
            return;
        }
        if (!force && !problemUpdated) {
            const lastUpdate = await fetchLastReadMeUpdate(templateFile);
            if (lastUpdate.fetchKind === 'file' &&
                (await getLastUpdate(templateFile)) == lastUpdate) {
                success('README.md is already up-to-date');
                return;
            }
        }
        info('Create README.md based on template/README.template.md...');
        const template = await better_fs_1.readFile(templateFile, {
            encoding: 'utf-8',
        });
        const result = await pgfm_1.preprocess(template, {}, pgfm_1.combineRuleset(pgfm_1.RootRuleset, pgfm_1.AnyRuleset));
        const target = path_1.join(constants_1.ROOT, 'README.md');
        better_fs_1.writeFile(target, result);
        success('All done!');
    }
}
exports.default = UpdateReadmeCommand;
UpdateReadmeCommand.description = 'Update README.md files';
UpdateReadmeCommand.flags = {
    force: command_1.flags.boolean({
        char: 'f',
        description: 'Whether to force update README.md files',
    }),
};
