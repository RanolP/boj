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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var string_width_1 = __importDefault(require("string-width"));
function stringify(s) {
    if (s === null) {
        return 'null';
    }
    if (s === undefined) {
        return 'undefined';
    }
    return s.toString();
}
exports.stringify = stringify;
function aligned(array, formatter, align) {
    if (align === void 0) { align = 'left'; }
    var stringified = array.map(function (it) {
        var s = formatter(it);
        return [s, string_width_1.default(s)];
    });
    var maxWidth = Math.max.apply(Math, __spread(stringified.map(function (it) { return it[1]; })));
    return array.map(function (_, index) {
        var _a = __read(stringified[index], 2), s = _a[0], width = _a[1];
        var spaces = maxWidth - width;
        switch (align) {
            case 'left': {
                return s + ' '.repeat(spaces);
            }
            case 'center': {
                return (' '.repeat(spaces % 2 == 0 ? spaces / 2 : (spaces - 1) / 2 + 1) +
                    s +
                    ' '.repeat(spaces % 2 == 0 ? spaces / 2 : (spaces - 1) / 2));
            }
            case 'right': {
                return ' '.repeat(spaces) + s;
            }
        }
    });
}
exports.aligned = aligned;
