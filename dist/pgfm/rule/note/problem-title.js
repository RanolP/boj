"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baekjoon_1 = require("../../../api/baekjoon");
exports.ProblemTitleRule = {
    name: 'problem-title',
    type: 'note',
    isBlock: false,
    async execute(_, { problem }) {
        return `${problem.id} ${await baekjoon_1.fetchProblemTitle(problem.id)}`;
    },
};
