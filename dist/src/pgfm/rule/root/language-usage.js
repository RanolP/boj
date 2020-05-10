"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const problem_1 = require("../../../lib/problem");
const dedent_1 = __importDefault(require("dedent"));
const path_1 = require("path");
const language_1 = require("../../../lib/language");
const constants_1 = require("../../../constants");
const better_fs_1 = require("../../../lib/better-fs");
const chart_1 = require("../../../lib/chart");
const crypto_1 = require("crypto");
const ExtensionLanguageNameMap = Object.fromEntries(language_1.Languages.map(({ name, fileExtension }) => [fileExtension, name]));
exports.LanguageUsageRule = {
    name: 'language-usage',
    type: 'root',
    isBlock: true,
    initialize() {
        const dir = path_1.join(constants_1.ROOT, 'boj-public', 'language-usage');
        return better_fs_1.rimraf(dir);
    },
    async execute() {
        var _a;
        const problemList = await problem_1.getProblemList();
        const solutions = (await Promise.all(problemList
            .filter((problem) => problem.isSolved)
            .map((problem) => problem.getSolutionList()))).flat();
        const ratio = Object.entries(solutions
            .map((solutionPath) => path_1.parse(solutionPath).ext)
            .reduce((acc, curr) => (Object.assign(Object.assign({}, acc), { [curr]: curr in acc ? acc[curr] + 1 : 1 })), {})).sort((a, b) => a[1] - b[1]);
        const chart = new chart_1.PieChart();
        let other = 0;
        for (const [ext, count] of ratio) {
            const languages = (_a = language_1.ExtensionLanguagesMap[ext]) !== null && _a !== void 0 ? _a : [];
            if (languages.length !== 1) {
                other += count;
            }
            else {
                chart.add({
                    color: languages[0].color,
                    label: languages[0].name,
                    value: count,
                });
            }
        }
        if (other > 0) {
            chart.add({
                color: '#d2d2d2',
                label: 'Other',
                value: other,
            });
        }
        const dir = path_1.join(constants_1.ROOT, 'boj-public', 'language-usage');
        if (await better_fs_1.notExists(dir)) {
            await better_fs_1.mkdirs(dir);
        }
        const graph = chart.render();
        const filename = crypto_1.createHash('md5').update(graph).digest('hex') + '.svg';
        await better_fs_1.writeFile(path_1.join(dir, filename), graph, { encoding: 'utf-8' });
        return [
            dedent_1.default `
        | 언어 | 사용 비율 |
        | ---- | --------- |
      `,
            ...ratio.map(([ext, count]) => {
                var _a;
                return dedent_1.default `
        | ${(_a = ExtensionLanguageNameMap[ext]) !== null && _a !== void 0 ? _a : 'Unknown'} (${ext}) | ${count} of ${solutions.length} (${((count / solutions.length) *
                    100).toFixed(2)}%) |
      `;
            }),
            `![pie-chart](${'.'}/boj-public/language-usage/${filename})`,
        ].join('\n');
    },
};
