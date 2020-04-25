"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("./chalk");
const string_width_1 = __importDefault(require("string-width"));
exports.chalk = __importStar(require("./chalk"));
class Logger {
    constructor(group) {
        this.group = group;
    }
    log(text, begins) {
        if (!text) {
            console.log();
            return;
        }
        if (text.indexOf('\n') === 0) {
            console.log(chalk_1.gray(`[${this.group}] > `) + begins + text);
        }
        else {
            const lines = text.split('\n');
            console.log(chalk_1.gray(`[${this.group}] > `) + begins + lines[0]);
            for (const line of lines.slice(1)) {
                if (line.trim().length == 0) {
                    console.log();
                }
                else {
                    console.log(`      ${line}`);
                }
            }
        }
    }
    labeled(input, second, third) {
        if (Array.isArray(input)) {
            if (input.length === 0) {
                return {};
            }
            if (Array.isArray(input[0])) {
                return this.labeledColoredObject(Object.fromEntries(input), second);
            }
            else {
                return this.labeledObject(input, second !== null && second !== void 0 ? second : third);
            }
        }
        return this.labeledColoredObject(Array.isArray(input) && Array.isArray(input[0])
            ? Object.fromEntries(input)
            : input, second);
    }
    labeledColoredObject(labels, second) {
        return Object.fromEntries(Object.entries(this.labeledObject(Object.keys(labels), typeof second === 'function' ? second : undefined)).map(([label, colorable]) => [
            label,
            (text) => colorable(labels[label], text),
        ]));
    }
    labeledObject(labels, second) {
        const maxLabelWidth = labels
            .concat(second && Array.isArray(second) ? second : [])
            .map((it) => string_width_1.default(it.toString()))
            .concat(typeof second !== 'number' ? [] : [second])
            .reduce((l, r) => Math.max(l, r), 0);
        return Object.fromEntries(labels.map((label) => {
            const f = (innerFirst, innerSecond) => {
                var _a, _b;
                let stylerToApply = (_b = (_a = (typeof innerFirst !== 'string' ? innerFirst : undefined)) !== null && _a !== void 0 ? _a : (typeof second === 'function' ? second : undefined)) !== null && _b !== void 0 ? _b : ((...param) => param.join(''));
                this.log(innerSecond !== null && innerSecond !== void 0 ? innerSecond : (typeof innerFirst === 'string' ? innerFirst : undefined), chalk_1.underline(stylerToApply ? stylerToApply(label) : label) +
                    ' '.repeat(maxLabelWidth - string_width_1.default(label.toString()) + 2));
            };
            return [
                label,
                Object.assign(f, {
                    colored: (styler) => (text) => f(styler, text),
                }),
            ];
        }));
    }
}
exports.Logger = Logger;
