"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var baekjoon_1 = require("../../../api/baekjoon");
exports.ProblemNameRule = {
    name: 'problem-name',
    type: 'note',
    isBlock: false,
    execute: function (_, _a) {
        var problem = _a.problem;
        return baekjoon_1.fetchProblemTitle(problem.id);
    },
};
