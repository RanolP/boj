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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var duration_1 = require("./duration");
var constants_1 = require("../constants");
var path_1 = require("path");
var better_fs_1 = require("../better-fs");
__export(require("./duration"));
function permastate(initial, key, duration, options) {
    if (options === void 0) { options = {}; }
    return [
        cached(initial, key, duration, options),
        cached(function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var _b = __read(_a, 1), v = _b[0];
            return v;
        }, function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var _b = __read(_a), _ = _b[0], params = _b.slice(1);
            return key.apply(void 0, __spread(params));
        }, duration_1.Duration.of({})),
    ];
}
exports.permastate = permastate;
function cached(body, key, duration, _a) {
    var _this = this;
    var _b = _a === void 0 ? {} : _a, _c = _b.useFileCache, useFileCache = _c === void 0 ? true : _c, _d = _b.useAbsoluteDate, useAbsoluteDate = _d === void 0 ? false : _d;
    var memCache = {};
    return Object.assign(function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return __awaiter(_this, void 0, void 0, function () {
            var currentKey, now, cacheFile, parsed, fetchKind, _a, content, _b, lastUpdate, data, from, passed, result, fetched, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        currentKey = typeof key === 'function' ? key.apply(void 0, __spread(params)) : key;
                        if (memCache[currentKey]) {
                            return [2 /*return*/, memCache[currentKey]];
                        }
                        now = new Date();
                        cacheFile = path_1.join(constants_1.ROOT, '.boj-cache', currentKey + '.json');
                        parsed = path_1.parse(cacheFile);
                        return [4 /*yield*/, better_fs_1.notExists(parsed.dir)];
                    case 1:
                        if (!_e.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, better_fs_1.mkdirs(parsed.dir)];
                    case 2:
                        _e.sent();
                        _e.label = 3;
                    case 3:
                        fetchKind = 'fetch';
                        _a = useFileCache;
                        if (!_a) return [3 /*break*/, 5];
                        return [4 /*yield*/, better_fs_1.exists(cacheFile)];
                    case 4:
                        _a = (_e.sent());
                        _e.label = 5;
                    case 5:
                        if (!_a) return [3 /*break*/, 7];
                        return [4 /*yield*/, better_fs_1.readFile(cacheFile, { encoding: 'utf-8' })];
                    case 6:
                        content = _e.sent();
                        try {
                            _b = JSON.parse(content), lastUpdate = _b.lastUpdate, data = _b.data;
                            from = new Date(lastUpdate);
                            passed = duration_1.Duration.fromDateRange(from, now);
                            if (passed.compareTo(duration, useAbsoluteDate) < 0) {
                                result = Object.assign(data, {
                                    fetchKind: 'file',
                                });
                                memCache[currentKey] = result;
                                return [2 /*return*/, result];
                            }
                        }
                        catch (_f) {
                            // do nothing
                        }
                        fetchKind = 'expired';
                        _e.label = 7;
                    case 7:
                        _d = (_c = Object).assign;
                        return [4 /*yield*/, body.apply(null, params)];
                    case 8:
                        fetched = _d.apply(_c, [_e.sent(), {
                                fetchKind: fetchKind,
                            }]);
                        memCache[currentKey] = fetched;
                        if (!useFileCache) return [3 /*break*/, 10];
                        return [4 /*yield*/, better_fs_1.writeFile(cacheFile, JSON.stringify({
                                lastUpdate: now.toISOString(),
                                data: fetched,
                            }, null, '  '))];
                    case 9:
                        _e.sent();
                        _e.label = 10;
                    case 10: return [2 /*return*/, memCache[currentKey]];
                }
            });
        });
    }, {
        force: function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var currentKey, now, cacheFile, fetched, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            currentKey = typeof key === 'function' ? key.apply(void 0, __spread(params)) : key;
                            now = new Date();
                            cacheFile = path_1.join(constants_1.ROOT, '.boj-cache', currentKey + '.json');
                            _b = (_a = Object).assign;
                            return [4 /*yield*/, body.apply(null, params)];
                        case 1:
                            fetched = _b.apply(_a, [_c.sent(), {
                                    fetchKind: 'force-fetch',
                                }]);
                            memCache[currentKey] = fetched;
                            if (!useFileCache) return [3 /*break*/, 3];
                            return [4 /*yield*/, better_fs_1.writeFile(cacheFile, JSON.stringify({
                                    lastUpdate: now.toISOString(),
                                    data: fetched,
                                }, null, '  '))];
                        case 2:
                            _c.sent();
                            _c.label = 3;
                        case 3: return [2 /*return*/, memCache[currentKey]];
                    }
                });
            });
        },
    });
}
exports.cached = cached;
