"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./node");
const BLOCK_RULE = /~~~([a-zA-Z\-_]+)\s+((?:~~?(?!~)|[^~]+)*)~~~/;
const INLINE_RULE = /{@((?!@)}|[^}]+)@}/;
const REGEX_RULESET = [
    [BLOCK_RULE, 'pgfm-block'],
    [INLINE_RULE, 'pgfm-inline'],
];
function parsePgfm(source) {
    const result = [];
    while (source.length > 0) {
        const [match, type] = REGEX_RULESET.map(([rule, type]) => [rule.exec(source), type]).sort(([a], [b]) => ((a === null || a === void 0 ? void 0 : a.index) || source.length) - ((b === null || b === void 0 ? void 0 : b.index) || source.length))[0];
        if (match === null) {
            result.push(node_1.createStringNode(source));
            break;
        }
        const before = source.substring(0, match.index);
        if (before.length > 0) {
            result.push(node_1.createStringNode(before));
        }
        try {
            result.push(node_1.createSyntaxNode(type, match[1].trim(), match.input.substring(match.index, match.index + match[0].length), match[2] && JSON.parse(match[2])));
        }
        catch (_a) {
            result.push(node_1.createStringNode(match.input));
        }
        source = source.substring(match.index + match[0].length);
    }
    return result;
}
exports.parsePgfm = parsePgfm;
