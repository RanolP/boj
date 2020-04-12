"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var solved_table_1 = require("./solved-table");
var language_usage_1 = require("./language-usage");
var __1 = require("..");
exports.RootRuleset = __1.classifyRules([solved_table_1.SolvedTableRule, language_usage_1.LanguageUsageRule]);
