"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = require("./parse");
const boxen_1 = __importDefault(require("boxen"));
const chalk_1 = __importDefault(require("chalk"));
async function preprocess(source, context, ruleset) {
    var _a, _b;
    const result = [];
    for (const node of parse_1.parsePgfm(source)) {
        switch (node.type) {
            case 'string': {
                result.push(node.data);
                break;
            }
            case 'pgfm-block': {
                const rule = ruleset.block[node.name];
                let text;
                try {
                    const data = (_a = node.data) !== null && _a !== void 0 ? _a : {};
                    if (!rule) {
                        throw new Error(`Unknown rule: ${node.name}`);
                    }
                    rule.schema && (await rule.schema.validate(data));
                    text = await rule.execute(data, context);
                }
                catch (e) {
                    if (!('noMessage' in e)) {
                        console.log(boxen_1.default(node.origin, { borderColor: 'gray', padding: 1 }));
                        console.log(chalk_1.default.red('error') + ' ' + e.message);
                    }
                    text = node.origin;
                }
                result.push('\n\n' + text + '\n\n');
                break;
            }
            case 'pgfm-inline': {
                const rule = ruleset.inline[node.name];
                let text;
                try {
                    const data = (_b = node.data) !== null && _b !== void 0 ? _b : {};
                    if (!rule) {
                        throw new Error(`Unknown rule: ${node.name}`);
                    }
                    rule.schema && (await rule.schema.validate(data));
                    text = await rule.execute(data, context);
                }
                catch (e) {
                    if (!('noMessage' in e)) {
                        console.log(boxen_1.default(node.origin, { borderColor: 'gray', padding: 1 }));
                        console.log(chalk_1.default.red('error') + ' ' + e.message);
                    }
                    text = node.origin;
                }
                result.push(text);
                break;
            }
        }
    }
    return result.join('');
}
exports.preprocess = preprocess;
