"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const string_width_1 = __importDefault(require("string-width"));
function stringify(s) {
    if (s === null) {
        return 'null';
    }
    if (s === undefined) {
        return 'undefined';
    }
    return s.toString();
}
exports.stringify = stringify;
function aligned(array, formatter, align = 'left') {
    const stringified = array.map((it) => {
        const s = formatter(it);
        return [s, string_width_1.default(s)];
    });
    const maxWidth = Math.max(...stringified.map((it) => it[1]));
    return array.map((_, index) => {
        const [s, width] = stringified[index];
        const spaces = maxWidth - width;
        switch (align) {
            case 'left': {
                return s + ' '.repeat(spaces);
            }
            case 'center': {
                return (' '.repeat(spaces % 2 == 0 ? spaces / 2 : (spaces - 1) / 2 + 1) +
                    s +
                    ' '.repeat(spaces % 2 == 0 ? spaces / 2 : (spaces - 1) / 2));
            }
            case 'right': {
                return ' '.repeat(spaces) + s;
            }
        }
    });
}
exports.aligned = aligned;
