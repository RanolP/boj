"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
function classifyRules(rules) {
    return rules.reduce(function (acc, curr) {
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
function combineRuleset() {
    var ruleset = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ruleset[_i] = arguments[_i];
    }
    return ruleset.reduce(function (acc, curr) { return ({
        block: __assign(__assign({}, acc.block), curr.block),
        inline: __assign(__assign({}, acc.inline), curr.inline),
    }); }, { block: {}, inline: {} });
}
exports.combineRuleset = combineRuleset;
__export(require("./root/"));
__export(require("./note/"));
