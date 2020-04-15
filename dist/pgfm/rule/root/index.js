"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const solved_table_1 = require("./solved-table");
const language_usage_1 = require("./language-usage");
const __1 = require("..");
exports.RootRuleset = __1.classifyRules([solved_table_1.SolvedTableRule, language_usage_1.LanguageUsageRule]);
