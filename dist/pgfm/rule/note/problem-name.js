"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baekjoon_1 = require("../../../api/baekjoon");
exports.ProblemNameRule = {
    name: 'problem-name',
    type: 'note',
    isBlock: false,
    execute(_, { problem }) {
        return baekjoon_1.fetchProblemTitle(problem.id);
    },
};
