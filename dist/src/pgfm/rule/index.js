"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
function classifyRules(rules) {
    return rules.reduce((acc, curr) => {
        if (curr.isBlock) {
            acc.block[curr.name] = curr;
        }
        else {
            acc.inline[curr.name] = curr;
        }
        return acc;
    }, {
        block: {},
        inline: {},
    });
}
exports.classifyRules = classifyRules;
function combineRuleset(...ruleset) {
    return ruleset.reduce((acc, curr) => ({
        block: Object.assign(Object.assign({}, acc.block), curr.block),
        inline: Object.assign(Object.assign({}, acc.inline), curr.inline),
    }), { block: {}, inline: {} });
}
exports.combineRuleset = combineRuleset;
__export(require("./root"));
__export(require("./note"));
__export(require("./any"));
