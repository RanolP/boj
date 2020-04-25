"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./node");
const vm_1 = __importDefault(require("vm"));
const cli_highlight_1 = require("cli-highlight");
const BLOCK_RULE = /~~~([a-zA-Z\-_]+)\s+((?:~~?(?!~)|[^~]+)*)~~~/;
const INLINE_RULE = /{@((?:(?!@)}|[^@}:]|@(?!}))+)(?::((?:(?!@)}|[^@}]|@(?!}))+))?@}/;
const REGEX_RULESET = [
    [BLOCK_RULE, 'pgfm-block'],
    [INLINE_RULE, 'pgfm-inline'],
];
function parsePgfm(file, warning, source) {
    var _a;
    const result = [];
    while (source.length > 0) {
        const [match, type] = REGEX_RULESET.map(([rule, type]) => [rule.exec(source), type]).sort(([a], [b]) => { var _a, _b; return ((_a = a === null || a === void 0 ? void 0 : a.index) !== null && _a !== void 0 ? _a : source.length) - ((_b = b === null || b === void 0 ? void 0 : b.index) !== null && _b !== void 0 ? _b : source.length); })[0];
        if (match === null) {
            result.push(node_1.createStringNode(source));
            break;
        }
        const before = source.substring(0, match.index);
        if (before.length > 0) {
            result.push(node_1.createStringNode(before));
        }
        try {
            const context = vm_1.default.createContext({
                module: {
                    exports: {},
                },
            });
            result.push(node_1.createSyntaxNode(type, match[1].trim(), match.input.substring(match.index, match.index + match[0].length), match[2]
                ? type === 'pgfm-block'
                    ? (_a = vm_1.default.runInContext(match[2], context)) !== null && _a !== void 0 ? _a : context.module.exports : match[2].trim()
                : undefined));
        }
        catch (e) {
            warning(`${e.message} on parsing ${file}\n${cli_highlight_1.highlight(match[0].trim(), {
                language: 'js',
            })}`);
            result.push(node_1.createStringNode(match.input));
        }
        source = source.substring(match.index + match[0].length);
    }
    return result;
}
exports.parsePgfm = parsePgfm;
