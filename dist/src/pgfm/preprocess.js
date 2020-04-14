"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var parse_1 = require("./parse");
function preprocess(source, context, ruleset) {
    return __awaiter(this, void 0, void 0, function () {
        var result, _a, _b, node, _c, rule, _d, _e, _f, _g, rule, _h, _j, _k, e_1_1;
        var e_1, _l;
        return __generator(this, function (_m) {
            switch (_m.label) {
                case 0:
                    result = [];
                    _m.label = 1;
                case 1:
                    _m.trys.push([1, 14, 15, 16]);
                    _a = __values(parse_1.parsePgfm(source)), _b = _a.next();
                    _m.label = 2;
                case 2:
                    if (!!_b.done) return [3 /*break*/, 13];
                    node = _b.value;
                    _c = node.type;
                    switch (_c) {
                        case 'string': return [3 /*break*/, 3];
                        case 'pgfm-block': return [3 /*break*/, 4];
                        case 'pgfm-inline': return [3 /*break*/, 8];
                    }
                    return [3 /*break*/, 12];
                case 3:
                    {
                        result.push(node.data);
                        return [3 /*break*/, 12];
                    }
                    _m.label = 4;
                case 4:
                    rule = ruleset.block[node.name];
                    _e = (_d = result).push;
                    _f = '\n\n';
                    if (!rule) return [3 /*break*/, 6];
                    return [4 /*yield*/, rule.execute(node.data, context)];
                case 5:
                    _g = _m.sent();
                    return [3 /*break*/, 7];
                case 6:
                    _g = node.origin;
                    _m.label = 7;
                case 7:
                    _e.apply(_d, [_f +
                            (_g) +
                            '\n\n']);
                    return [3 /*break*/, 12];
                case 8:
                    rule = ruleset.inline[node.name];
                    _j = (_h = result).push;
                    if (!rule) return [3 /*break*/, 10];
                    return [4 /*yield*/, rule.execute(node.data, context)];
                case 9:
                    _k = _m.sent();
                    return [3 /*break*/, 11];
                case 10:
                    _k = node.origin;
                    _m.label = 11;
                case 11:
                    _j.apply(_h, [_k]);
                    return [3 /*break*/, 12];
                case 12:
                    _b = _a.next();
                    return [3 /*break*/, 2];
                case 13: return [3 /*break*/, 16];
                case 14:
                    e_1_1 = _m.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 16];
                case 15:
                    try {
                        if (_b && !_b.done && (_l = _a.return)) _l.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 16: return [2 /*return*/, result.join('')];
            }
        });
    });
}
exports.preprocess = preprocess;
