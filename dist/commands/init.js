"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_fs_1 = require("../lib/better-fs");
const path_1 = require("path");
const constants_1 = require("../constants");
const baekjoon_1 = require("../api/baekjoon");
const inquirer_1 = require("inquirer");
const inquirer_autocomplete_prompt_1 = __importDefault(require("inquirer-autocomplete-prompt"));
const inquirer_checkbox_plus_prompt_1 = __importDefault(require("inquirer-checkbox-plus-prompt"));
const console_1 = require("../util/console");
const problem_1 = require("../lib/problem");
const cache_1 = require("../cache");
const language_1 = require("../util/language");
const fuzzy_1 = require("fuzzy");
inquirer_1.registerPrompt('autocomplete', inquirer_autocomplete_prompt_1.default);
inquirer_1.registerPrompt('checkbox-plus', inquirer_checkbox_plus_prompt_1.default);
const [order, setOrder] = cache_1.permastate(() => 1, () => 'order', cache_1.Duration.of({ hour: 24 }), {
    useAbsoluteDate: true,
});
const command_1 = require("@oclif/command");
class InitCommand extends command_1.Command {
    async run() {
        let id = this.parse(InitCommand).flags.id ||
            (await inquirer_1.prompt({
                type: 'autocomplete',
                name: 'id',
                message: 'Search BOJ Problem',
                source: (_, query) => baekjoon_1.searchProblem(query || ''),
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
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            const meta = {
                createDate: `${year}-${month}-${day}`,
                solvedDate: `${year}-${month}-${day}`,
                status: 'in-progress',
                type: 'daily-boj',
                order: await order(),
            };
            await better_fs_1.writeFile(path_1.join(problemPath, 'meta.json'), JSON.stringify(meta, null, '  '));
            await setOrder((await order()) + 1);
        }
        const problem = await problem_1.getProblem(id);
        const solutions = await problem.getSolutions();
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
                ].concat(language_1.searchLanguage(query || '')),
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
                        source: async (_, query) => fuzzy_1.filter(query || '', files, {
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
