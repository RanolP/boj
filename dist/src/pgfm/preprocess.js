"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = require("./parse");
const cli_highlight_1 = __importDefault(require("cli-highlight"));
async function processRule(file, warning, rule, context, node) {
    var _a;
    try {
        const data = (_a = node.data) !== null && _a !== void 0 ? _a : {};
        if (!rule) {
            throw new Error(`Unknown rule: ${node.name}`);
        }
        rule.schema && (await rule.schema.validate(data));
        return await rule.execute(data, context);
    }
    catch (e) {
        warning(`${e.message} on preprocessing ${file}\n${cli_highlight_1.default(node.origin.trim(), {
            language: 'js',
        })}`);
        return node.origin;
    }
}
async function preprocess(file, warning, source, context, ruleset) {
    const result = [];
    for (const node of parse_1.parsePgfm(file, warning, source)) {
        switch (node.type) {
            case 'string': {
                result.push(node.data);
                break;
            }
            case 'pgfm-block': {
                const rule = ruleset.block[node.name];
                result.push('\n\n' +
                    (await processRule(file, warning, rule, context, node)) +
                    '\n\n');
                break;
            }
            case 'pgfm-inline': {
                const rule = ruleset.inline[node.name];
                result.push(await processRule(file, warning, rule, context, node));
                break;
            }
        }
    }
    return result.join('');
}
exports.preprocess = preprocess;
