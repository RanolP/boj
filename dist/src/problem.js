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
var better_fs_1 = require("./better-fs");
var path_1 = require("path");
var constants_1 = require("./constants");
var PROBLEM_NUMBER_REGEX = /^[0-9]+$/;
var problems = null;
function getProblemList() {
    return __awaiter(this, void 0, void 0, function () {
        var result, fileList, _i, fileList_1, file, fetchedStat, folderBasename, problem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (problems) {
                        return [2 /*return*/, problems];
                    }
                    result = [];
                    return [4 /*yield*/, better_fs_1.readdir(constants_1.ROOT)];
                case 1:
                    fileList = _a.sent();
                    _i = 0, fileList_1 = fileList;
                    _a.label = 2;
                case 2:
                    if (!(_i < fileList_1.length)) return [3 /*break*/, 6];
                    file = fileList_1[_i];
                    return [4 /*yield*/, better_fs_1.lstat(path_1.join(constants_1.ROOT, file))];
                case 3:
                    fetchedStat = _a.sent();
                    if (fetchedStat.isFile()) {
                        return [3 /*break*/, 5];
                    }
                    folderBasename = path_1.basename(file);
                    if (!PROBLEM_NUMBER_REGEX.test(folderBasename)) return [3 /*break*/, 5];
                    problem = new Problem(Number(folderBasename));
                    return [4 /*yield*/, problem.initialize()];
                case 4:
                    _a.sent();
                    result.push(problem);
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6:
                    problems = result;
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.getProblemList = getProblemList;
function getProblem(id) {
    return __awaiter(this, void 0, void 0, function () {
        var problemList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getProblemList()];
                case 1:
                    problemList = _a.sent();
                    return [2 /*return*/, problemList.find(function (problem) { return problem.id === id; })];
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
            var result, fileList, _i, fileList_2, file, fetchedStat, filename;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        return [4 /*yield*/, better_fs_1.readdir(path_1.join(constants_1.ROOT, this.id.toString()))];
                    case 1:
                        fileList = _a.sent();
                        _i = 0, fileList_2 = fileList;
                        _a.label = 2;
                    case 2:
                        if (!(_i < fileList_2.length)) return [3 /*break*/, 5];
                        file = fileList_2[_i];
                        return [4 /*yield*/, better_fs_1.lstat(path_1.join(constants_1.ROOT, this.id.toString(), file))];
                    case 3:
                        fetchedStat = _a.sent();
                        if (fetchedStat.isDirectory()) {
                            return [3 /*break*/, 4];
                        }
                        filename = path_1.parse(file).name;
                        if (filename !== 'solution') {
                            return [3 /*break*/, 4];
                        }
                        result.push(file);
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, result];
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
