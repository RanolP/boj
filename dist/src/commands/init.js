"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const better_fs_1 = require("../lib/better-fs");
const path_1 = require("path");
const constants_1 = require("../constants");
const baekjoon_1 = require("../api/baekjoon");
const inquirer_1 = require("../vendors/inquirer");
const console_1 = require("../util/console");
const problem_1 = require("../lib/problem");
const cache_1 = require("../cache");
const language_1 = require("../util/language");
const fuzzy_1 = require("fuzzy");
const command_1 = require("@oclif/command");
const date_1 = require("../util/date");
const [order, setOrder] = cache_1.permastate(() => 1, () => 'order', cache_1.Duration.of({ hour: 24 }), {
    useAbsoluteDate: true,
});
class InitCommand extends command_1.Command {
    async run() {
        var _a;
        let id = (_a = this.parse(InitCommand).flags.id) !== null && _a !== void 0 ? _a : (await inquirer_1.prompt({
            type: 'autocomplete',
            name: 'id',
            message: 'Search BOJ Problem',
            source: (_, query) => baekjoon_1.searchProblem(query !== null && query !== void 0 ? query : ''),
        })).id;
        const base = new console_1.Logger('init');
        const { create, warning } = base.labeled({
            create: console_1.chalk.green,
            warning: console_1.chalk.yellow,
        });
        const problemPath = path_1.join(constants_1.ROOT, id.toString());
        if (await better_fs_1.notExists(problemPath)) {
            await better_fs_1.mkdirs(problemPath);
            create(`Folder for ${id}`);
        }
        if (await better_fs_1.notExists(path_1.join(problemPath, 'meta.json'))) {
            const now = new Date();
            const meta = {
                createDate: date_1.formatDate(now),
                status: 'in-progress',
                type: 'daily-boj',
                order: await order(),
            };
            await better_fs_1.writeFile(path_1.join(problemPath, 'meta.json'), JSON.stringify(meta, null, '  '));
            await setOrder((await order()) + 1);
        }
        const problem = (await problem_1.getProblem(id));
        const solutions = await problem.getSolutionList();
        if (solutions.length === 0) {
            const { language } = await inquirer_1.prompt({
                type: 'autocomplete',
                name: 'language',
                message: 'Language',
                source: async (_, query) => [
                    {
                        name: 'Select it later',
                        value: undefined,
                    },
                ].concat(language_1.searchLanguage(query !== null && query !== void 0 ? query : '')),
            });
            if (language) {
                let source = '';
                let sourceType = 'empty';
                const templateDirectory = path_1.join(constants_1.ROOT, 'template', language.id);
                if (await better_fs_1.exists(templateDirectory)) {
                    const files = (await better_fs_1.readdir(templateDirectory))
                        .map((it) => path_1.parse(it))
                        .filter((it) => it.ext === language.fileExtension);
                    const main = 'main' + language.fileExtension;
                    const { templateToUse } = await inquirer_1.prompt({
                        type: 'checkbox-plus',
                        name: 'templateToUse',
                        message: 'Templates',
                        default: files.some((it) => it.base === main) ? [main] : [],
                        source: async (_, query) => fuzzy_1.filter(query !== null && query !== void 0 ? query : '', files, {
                            extract: ({ base }) => base,
                        }).map(({ original }) => ({
                            name: original.name,
                            value: original.base,
                            short: original.name,
                        })),
                        highlight: true,
                        searchable: true,
                    });
                    const concatenated = await Promise.all(templateToUse
                        .filter((it) => it !== main)
                        .map((it) => better_fs_1.readFile(path_1.join(templateDirectory, it), { encoding: 'utf-8' })));
                    source =
                        concatenated
                            .map((it) => it.trim())
                            .concat(templateToUse.some((it) => it === main)
                            ? [
                                (await better_fs_1.readFile(path_1.join(templateDirectory, main), {
                                    encoding: 'utf-8',
                                })).trim(),
                            ]
                            : [])
                            .join('\n\n') + '\n';
                    sourceType = 'template';
                }
                await better_fs_1.writeFile(path_1.join(problemPath, 'solution' + language.fileExtension), source);
                create(`Solution file for ${id} (${sourceType})`);
            }
        }
        if (await better_fs_1.notExists(problem.noteFile)) {
            const { shouldCreate } = !problem.isSolved
                ? await inquirer_1.prompt({
                    type: 'confirm',
                    name: 'shouldCreate',
                    message: 'Would you create note file?',
                })
                : { shouldCreate: true };
            if (shouldCreate) {
                const templatePath = path_1.join(constants_1.ROOT, 'template', 'Note.template.md');
                const template = (await better_fs_1.exists(templatePath))
                    ? await better_fs_1.readFile(templatePath, { encoding: 'utf-8' })
                    : '';
                await better_fs_1.writeFile(problem.noteFile, template);
                if (template.length === 0) {
                    warning('Note.md generated as an empty file.');
                }
                create(`Note.md file for ${id}`);
            }
        }
    }
}
exports.default = InitCommand;
InitCommand.description = 'Initialize problem';
InitCommand.flags = {
    id: command_1.flags.integer({
        description: 'The id of problem',
        helpValue: '1000',
    }),
};
