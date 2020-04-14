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
var better_fs_1 = require("./better-fs");
var path_1 = require("path");
var constants_1 = require("./constants");
var PROBLEM_NUMBER_REGEX = /^[0-9]+$/;
var problems = {};
var fetchStatus = {
    allFetched: false,
    array: [],
    arraySorted: [],
};
function getProblemList(_a) {
    var _b = (_a === void 0 ? {} : _a).sorted, sorted = _b === void 0 ? false : _b;
    return __awaiter(this, void 0, void 0, function () {
        var fileList, fileList_1, fileList_1_1, file, fetchedStat, folderBasename, e_1_1;
        var e_1, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!!fetchStatus.allFetched) return [3 /*break*/, 10];
                    return [4 /*yield*/, better_fs_1.readdir(constants_1.ROOT)];
                case 1:
                    fileList = _d.sent();
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 7, 8, 9]);
                    fileList_1 = __values(fileList), fileList_1_1 = fileList_1.next();
                    _d.label = 3;
                case 3:
                    if (!!fileList_1_1.done) return [3 /*break*/, 6];
                    file = fileList_1_1.value;
                    return [4 /*yield*/, better_fs_1.lstat(path_1.join(constants_1.ROOT, file))];
                case 4:
                    fetchedStat = _d.sent();
                    if (fetchedStat.isFile()) {
                        return [3 /*break*/, 5];
                    }
                    folderBasename = path_1.basename(file);
                    if (PROBLEM_NUMBER_REGEX.test(folderBasename)) {
                        getProblem(Number(folderBasename));
                    }
                    _d.label = 5;
                case 5:
                    fileList_1_1 = fileList_1.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (fileList_1_1 && !fileList_1_1.done && (_c = fileList_1.return)) _c.call(fileList_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 9:
                    fetchStatus.allFetched = true;
                    fetchStatus.array = Object.values(problems);
                    fetchStatus.arraySorted = Object.values(problems).sort(function (a, b) {
                        var date = a.meta.date.localeCompare(b.meta.date);
                        if (date !== 0) {
                            return date;
                        }
                        return a.meta.order - b.meta.order;
                    });
                    _d.label = 10;
                case 10: return [2 /*return*/, sorted ? fetchStatus.arraySorted : fetchStatus.array];
            }
        });
    });
}
exports.getProblemList = getProblemList;
function getProblem(id) {
    return __awaiter(this, void 0, void 0, function () {
        var problem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    problem = new Problem(id);
                    return [4 /*yield*/, problem.initialize()];
                case 1:
                    _a.sent();
                    problems[id] = problem;
                    return [2 /*return*/, problem];
            }
        });
    });
}
exports.getProblem = getProblem;
var Problem = /** @class */ (function () {
    function Problem(id) {
        this.id = id;
        this._meta = null;
    }
    Problem.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this;
                        _c = (_b = JSON).parse;
                        return [4 /*yield*/, better_fs_1.readFile(path_1.join(constants_1.ROOT, this.id.toString(), 'meta.json'), {
                                encoding: 'utf-8',
                            })];
                    case 1:
                        _a._meta = _c.apply(_b, [_d.sent()]);
                        return [2 /*return*/, this._meta];
                }
            });
        });
    };
    Object.defineProperty(Problem.prototype, "isSolved", {
        get: function () {
            switch (this.meta.status) {
                case 'solved':
                case 'solved-late':
                    return true;
                default:
                    return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Problem.prototype, "noteFile", {
        get: function () {
            return path_1.join(constants_1.ROOT, this.id.toString(), 'Note.md');
        },
        enumerable: true,
        configurable: true
    });
    Problem.prototype.getSolutions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, fileList, fileList_2, fileList_2_1, file, fetchedStat, filename, e_2_1;
            var e_2, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = [];
                        return [4 /*yield*/, better_fs_1.readdir(path_1.join(constants_1.ROOT, this.id.toString()))];
                    case 1:
                        fileList = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, 8, 9]);
                        fileList_2 = __values(fileList), fileList_2_1 = fileList_2.next();
                        _b.label = 3;
                    case 3:
                        if (!!fileList_2_1.done) return [3 /*break*/, 6];
                        file = fileList_2_1.value;
                        return [4 /*yield*/, better_fs_1.lstat(path_1.join(constants_1.ROOT, this.id.toString(), file))];
                    case 4:
                        fetchedStat = _b.sent();
                        if (fetchedStat.isDirectory()) {
                            return [3 /*break*/, 5];
                        }
                        filename = path_1.parse(file).name;
                        if (filename !== 'solution') {
                            return [3 /*break*/, 5];
                        }
                        result.push(file);
                        _b.label = 5;
                    case 5:
                        fileList_2_1 = fileList_2.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (fileList_2_1 && !fileList_2_1.done && (_a = fileList_2.return)) _a.call(fileList_2);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, result];
                }
            });
        });
    };
    Object.defineProperty(Problem.prototype, "meta", {
        get: function () {
            return this._meta;
        },
        enumerable: true,
        configurable: true
    });
    return Problem;
}());
exports.Problem = Problem;
