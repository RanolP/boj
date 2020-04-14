"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = require("./node");
var BLOCK_RULE = /~~~([a-zA-Z\-_]+)\s+((?:~~?(?!~)|[^~]+)*)~~~/;
var INLINE_RULE = /{@((?!@)}|[^}]+)@}/;
var REGEX_RULESET = [
    [BLOCK_RULE, 'pgfm-block'],
    [INLINE_RULE, 'pgfm-inline'],
];
function parsePgfm(source) {
    var result = [];
    while (source.length > 0) {
        var _a = __read(REGEX_RULESET.map(function (_a) {
            var _b = __read(_a, 2), rule = _b[0], type = _b[1];
            return [rule.exec(source), type];
        }).sort(function (_a, _b) {
            var _c = __read(_a, 1), a = _c[0];
            var _d = __read(_b, 1), b = _d[0];
            return ((a === null || a === void 0 ? void 0 : a.index) || source.length) - ((b === null || b === void 0 ? void 0 : b.index) || source.length);
        })[0], 2), match = _a[0], type = _a[1];
        if (match === null) {
            result.push(node_1.createStringNode(source));
            break;
        }
        var before = source.substring(0, match.index);
        if (before.length > 0) {
            result.push(node_1.createStringNode(before));
        }
        try {
            result.push(node_1.createSyntaxNode(type, match[1].trim(), match.input.substring(match.index, match.index + match[0].length), match[2] && JSON.parse(match[2])));
        }
        catch (_b) {
            result.push(node_1.createStringNode(match.input));
        }
        source = source.substring(match.index + match[0].length);
    }
    return result;
}
exports.parsePgfm = parsePgfm;
