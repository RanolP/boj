"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const problem_info_table_1 = require("./problem-info-table");
const problem_title_1 = require("./problem-title");
const problem_number_1 = require("./problem-number");
const problem_name_1 = require("./problem-name");
const __1 = require("..");
exports.NoteRuleset = __1.classifyRules([
    problem_info_table_1.ProblemInfoTableRule,
    problem_title_1.ProblemTitleRule,
    problem_number_1.ProblemNumberRule,
    problem_name_1.ProblemNameRule,
]);
