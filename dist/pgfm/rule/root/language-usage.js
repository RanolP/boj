"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const problem_1 = require("../../../lib/problem");
const dedent_1 = __importDefault(require("dedent"));
const path_1 = require("path");
const language_1 = require("../../../util/language");
const ExtensionLanguageNameMap = Object.fromEntries(language_1.Languages.map(({ name, fileExtension }) => [fileExtension, name]));
exports.LanguageUsageRule = {
    name: 'language-usage',
    type: 'root',
    isBlock: true,
    async execute() {
        const problemList = await problem_1.getProblemList();
        const solutions = (await Promise.all(problemList
            .filter((problem) => problem.isSolved)
            .map((problem) => problem.getSolutions()))).flat();
        const ratio = solutions
            .map((solutionPath) => path_1.parse(solutionPath).ext)
            .reduce((acc, curr) => (Object.assign(Object.assign({}, acc), { [curr]: curr in acc ? acc[curr] + 1 : 1 })), {});
        return [
            dedent_1.default `
        | 언어 | 사용 비율 |
        | ---- | --------- |
      `,
        ]
            .concat(Object.entries(ratio).map(([ext, count]) => dedent_1.default `
        | ${ExtensionLanguageNameMap[ext] || 'Unknown'} (${ext}) | ${count} of ${solutions.length} (${((count / solutions.length) *
            100).toFixed(2)}%) |
      `))
            .join('\n');
    },
};
