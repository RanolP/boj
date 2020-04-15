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
var fs_1 = require("fs");
var util_1 = require("util");
var path_1 = require("path");
exports.readdir = util_1.promisify(fs_1.readdir);
exports.lstat = util_1.promisify(fs_1.lstat);
exports.symlink = util_1.promisify(fs_1.symlink);
exports.access = util_1.promisify(fs_1.access);
exports.exists = function (path, mode) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, exports.access(path_1.resolve(path.toString()), mode || fs_1.constants.F_OK)];
            case 1:
                _a.sent();
                return [2 /*return*/, true];
            case 2:
                error_1 = _a.sent();
                if (error_1 && error_1.code === 'ENOENT') {
                    return [2 /*return*/, false];
                }
                else {
                    throw error_1;
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.existsFile = function (path, mode) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, exports.exists(path, mode)];
            case 1:
                _a = (_b.sent());
                if (!_a) return [3 /*break*/, 3];
                return [4 /*yield*/, exports.lstat(path_1.resolve(path.toString()))];
            case 2:
                _a = (_b.sent()).isFile();
                _b.label = 3;
            case 3: return [2 /*return*/, _a];
        }
    });
}); };
exports.existsDirectory = function (path, mode) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, exports.exists(path, mode)];
            case 1:
                _a = (_b.sent());
                if (!_a) return [3 /*break*/, 3];
                return [4 /*yield*/, exports.lstat(path_1.resolve(path.toString()))];
            case 2:
                _a = (_b.sent()).isDirectory();
                _b.label = 3;
            case 3: return [2 /*return*/, _a];
        }
    });
}); };
exports.notExists = function (path, mode) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, exports.exists(path, mode)];
        case 1: return [2 /*return*/, !(_a.sent())];
    }
}); }); };
exports.notExistsFile = function (path, mode) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, exports.existsFile(path, mode)];
        case 1: return [2 /*return*/, !(_a.sent())];
    }
}); }); };
exports.notExistsDirectory = function (path, mode) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, exports.existsDirectory(path, mode)];
        case 1: return [2 /*return*/, !(_a.sent())];
    }
}); }); };
exports.unlink = util_1.promisify(fs_1.unlink);
exports.readlink = util_1.promisify(fs_1.readlink);
exports.readFile = util_1.promisify(fs_1.readFile);
exports.writeFile = util_1.promisify(fs_1.writeFile);
exports.mkdir = util_1.promisify(fs_1.mkdir);
exports.rmdir = util_1.promisify(fs_1.rmdir);
exports.mkdirs = function (dir) { return __awaiter(void 0, void 0, void 0, function () {
    var parsed;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                parsed = path_1.parse(dir.toString());
                return [4 /*yield*/, exports.notExists(parsed.dir)];
            case 1:
                if (!_a.sent()) return [3 /*break*/, 3];
                return [4 /*yield*/, exports.mkdirs(parsed.dir)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/, exports.mkdir(dir)];
        }
    });
}); };
exports.rimraf = function (path, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.file, file = _c === void 0 ? function () { return true; } : _c, _d = _b.folder, folder = _d === void 0 ? function () { return true; } : _d;
    return __awaiter(void 0, void 0, void 0, function () {
        var realPath, stat, _e, _f, child, e_1_1;
        var e_1, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    realPath = path_1.resolve(path.toString());
                    return [4 /*yield*/, exports.notExists(realPath)];
                case 1:
                    if (_h.sent()) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, exports.lstat(realPath)];
                case 2:
                    stat = _h.sent();
                    if (!stat.isFile()) return [3 /*break*/, 5];
                    if (!file(realPath, stat)) return [3 /*break*/, 4];
                    return [4 /*yield*/, exports.unlink(realPath)];
                case 3:
                    _h.sent();
                    _h.label = 4;
                case 4: return [2 /*return*/];
                case 5:
                    if (!folder(realPath, stat)) {
                        return [2 /*return*/];
                    }
                    _h.label = 6;
                case 6:
                    _h.trys.push([6, 12, 13, 14]);
                    return [4 /*yield*/, exports.readdir(realPath)];
                case 7:
                    _e = __values.apply(void 0, [_h.sent()]), _f = _e.next();
                    _h.label = 8;
                case 8:
                    if (!!_f.done) return [3 /*break*/, 11];
                    child = _f.value;
                    return [4 /*yield*/, exports.rimraf(path_1.join(realPath, child))];
                case 9:
                    _h.sent();
                    _h.label = 10;
                case 10:
                    _f = _e.next();
                    return [3 /*break*/, 8];
                case 11: return [3 /*break*/, 14];
                case 12:
                    e_1_1 = _h.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 14];
                case 13:
                    try {
                        if (_f && !_f.done && (_g = _e.return)) _g.call(_e);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 14: return [4 /*yield*/, exports.rmdir(realPath)];
                case 15:
                    _h.sent();
                    return [2 /*return*/];
            }
        });
    });
};
