"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeRun = {
    executeCommand: './Main',
};
exports.limitModifier = (unit) => ({ multiply = 1, add = 0, }) => {
    return {
        stringified: [multiply != 1 && `×${multiply}`, add !== 0 && `+${add}`, unit]
            .filter(Boolean)
            .join(''),
        evaluate: (base) => base * multiply + add,
    };
};
exports.time = exports.limitModifier('초');
exports.memory = exports.limitModifier('MB');
