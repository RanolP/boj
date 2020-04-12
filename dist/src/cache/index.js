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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var duration_1 = require("./duration");
var constants_1 = require("../constants");
var path_1 = require("path");
var better_fs_1 = require("../better-fs");
__export(require("./duration"));
function cached(body, key, duration) {
    var _this = this;
    var memCache = {};
    return function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return __awaiter(_this, void 0, void 0, function () {
            var currentKey, now, cacheFile, parsed, fetchKind, content, cacheData, from, passed, result, fetched, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        currentKey = typeof key === 'function' ? key.apply(void 0, params) : key;
                        if (memCache[currentKey]) {
                            return [2 /*return*/, memCache[currentKey]];
                        }
                        now = new Date();
                        cacheFile = path_1.join(constants_1.ROOT, '.boj-cache', currentKey + '.json');
                        parsed = path_1.parse(cacheFile);
                        return [4 /*yield*/, better_fs_1.exists(parsed.dir)];
                    case 1:
                        if (!!(_c.sent())) return [3 /*break*/, 3];
                        return [4 /*yield*/, better_fs_1.mkdirs(parsed.dir)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        fetchKind = 'first';
                        return [4 /*yield*/, better_fs_1.exists(cacheFile)];
                    case 4:
                        if (!_c.sent()) return [3 /*break*/, 6];
                        return [4 /*yield*/, better_fs_1.readFile(cacheFile, { encoding: 'utf-8' })];
                    case 5:
                        content = _c.sent();
                        try {
                            cacheData = JSON.parse(content);
                            from = new Date(cacheData.lastUpdate);
                            passed = duration_1.Duration.fromDateRange(from, now);
                            if (passed < duration) {
                                result = Object.assign(JSON.parse(cacheData.data), {
                                    fetchKind: fetchKind,
                                });
                                memCache[currentKey] = result;
                                return [2 /*return*/, result];
                            }
                        }
                        catch (_d) {
                            // do nothing
                        }
                        fetchKind = 'expired';
                        _c.label = 6;
                    case 6:
                        _b = (_a = Object).assign;
                        return [4 /*yield*/, body.apply(fetchKind, params)];
                    case 7:
                        fetched = _b.apply(_a, [_c.sent(), {
                                fetchKind: fetchKind,
                            }]);
                        memCache[currentKey] = fetched;
                        return [4 /*yield*/, better_fs_1.writeFile(cacheFile, JSON.stringify({
                                lastUpdate: now.toISOString(),
                                data: fetched,
                            }))];
                    case 8:
                        _c.sent();
                        return [2 /*return*/, memCache[currentKey]];
                }
            });
        });
    };
}
exports.cached = cached;
