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
Object.defineProperty(exports, "__esModule", { value: true });
var parse_1 = require("./parse");
function preprocess(source, context, ruleset) {
    return __awaiter(this, void 0, void 0, function () {
        var result, _i, _a, node, _b, rule, _c, _d, _e, _f, rule, _g, _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    result = [];
                    _i = 0, _a = parse_1.parsePgfm(source);
                    _k.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 12];
                    node = _a[_i];
                    _b = node.type;
                    switch (_b) {
                        case 'string': return [3 /*break*/, 2];
                        case 'pgfm-block': return [3 /*break*/, 3];
                        case 'pgfm-inline': return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 11];
                case 2:
                    {
                        result.push(node.data);
                        return [3 /*break*/, 11];
                    }
                    _k.label = 3;
                case 3:
                    rule = ruleset.block[node.name];
                    _d = (_c = result).push;
                    _e = '\n\n';
                    if (!rule) return [3 /*break*/, 5];
                    return [4 /*yield*/, rule.execute(node.data, context)];
                case 4:
                    _f = _k.sent();
                    return [3 /*break*/, 6];
                case 5:
                    _f = node.origin;
                    _k.label = 6;
                case 6:
                    _d.apply(_c, [_e +
                            (_f) +
                            '\n\n']);
                    return [3 /*break*/, 11];
                case 7:
                    rule = ruleset.inline[node.name];
                    _h = (_g = result).push;
                    if (!rule) return [3 /*break*/, 9];
                    return [4 /*yield*/, rule.execute(node.data, context)];
                case 8:
                    _j = _k.sent();
                    return [3 /*break*/, 10];
                case 9:
                    _j = node.origin;
                    _k.label = 10;
                case 10:
                    _h.apply(_g, [_j]);
                    return [3 /*break*/, 11];
                case 11:
                    _i++;
                    return [3 /*break*/, 1];
                case 12: return [2 /*return*/, result.join('')];
            }
        });
    });
}
exports.preprocess = preprocess;
