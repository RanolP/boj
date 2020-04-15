"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemNumberRule = {
    name: 'problem-number',
    type: 'note',
    isBlock: false,
    execute(_, { problem }) {
        return `${problem.id}`;
    },
};
