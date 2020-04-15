"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("./chalk");
exports.chalk = __importStar(require("./chalk"));
class Logger {
    constructor(group) {
        this.group = group;
    }
    log(text) {
        if (!text) {
            return;
        }
        console.log(chalk_1.gray(`[${this.group}] > `) + text);
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
                return this.labeledObject(input, second || third);
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
        const maxLabelLength = labels
            .concat(second && Array.isArray(second) ? second : [])
            .map((it) => it.toString().length)
            .concat(typeof second !== 'number' ? [] : [second])
            .reduce((l, r) => Math.max(l, r), 0);
        return Object.fromEntries(labels.map((label) => [
            label,
            (innerFirst, innerSecond) => {
                let stylerToApply = (typeof innerFirst !== 'string' ? innerFirst : undefined) ||
                    (typeof second === 'function' ? second : undefined) ||
                    ((...param) => param.join(''));
                this.log(chalk_1.underline(stylerToApply ? stylerToApply(label) : label) +
                    ' '.repeat(maxLabelLength - label.toString().length + 2) +
                    (innerSecond ||
                        (typeof innerFirst === 'string' ? innerFirst : undefined)));
            },
        ]));
    }
}
exports.Logger = Logger;
