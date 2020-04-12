"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var problem_info_table_1 = require("./problem-info-table");
var problem_title_1 = require("./problem-title");
var problem_number_1 = require("./problem-number");
var problem_name_1 = require("./problem-name");
var __1 = require("..");
exports.NoteRuleset = __1.classifyRules([
    problem_info_table_1.ProblemInfoTableRule,
    problem_title_1.ProblemTitleRule,
    problem_number_1.ProblemNumberRule,
    problem_name_1.ProblemNameRule,
]);
