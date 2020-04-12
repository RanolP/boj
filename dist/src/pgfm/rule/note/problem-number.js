"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemNumberRule = {
    name: 'problem-number',
    type: 'note',
    isBlock: false,
    execute: function (_, _a) {
        var problem = _a.problem;
        return "" + problem.id;
    },
};
