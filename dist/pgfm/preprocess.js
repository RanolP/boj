"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = require("./parse");
async function preprocess(source, context, ruleset) {
    const result = [];
    for (const node of parse_1.parsePgfm(source)) {
        switch (node.type) {
            case 'string': {
                result.push(node.data);
                break;
            }
            case 'pgfm-block': {
                const rule = ruleset.block[node.name];
                result.push('\n\n' +
                    (rule ? await rule.execute(node.data, context) : node.origin) +
                    '\n\n');
                break;
            }
            case 'pgfm-inline': {
                const rule = ruleset.inline[node.name];
                result.push(rule ? await rule.execute(node.data, context) : node.origin);
                break;
            }
        }
    }
    return result.join('');
}
exports.preprocess = preprocess;
