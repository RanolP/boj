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
var better_fs_1 = require("../src/better-fs");
var problem_1 = require("../src/problem");
var constants_1 = require("../src/constants");
var path_1 = require("path");
var chalk_1 = require("chalk");
var inquirer_1 = require("inquirer");
var console_1 = require("../src/util/console");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var problemList, base, problemLoggers, problemList_1, problemList_1_1, problem, log, solutions, solution, source, target, fetchedStat, link, overwrite, e_1_1;
    var e_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, problem_1.getProblemList()];
            case 1:
                problemList = _b.sent();
                base = new console_1.Logger('update-symlink');
                problemLoggers = base.labeled(problemList.map(function (it) { return it.id; }));
                _b.label = 2;
            case 2:
                _b.trys.push([2, 19, 20, 21]);
                problemList_1 = __values(problemList), problemList_1_1 = problemList_1.next();
                _b.label = 3;
            case 3:
                if (!!problemList_1_1.done) return [3 /*break*/, 18];
                problem = problemList_1_1.value;
                log = problemLoggers[problem.id];
                if (!problem.isSolved) {
                    log(console_1.chalk.yellow, 'Not solved, pass.');
                    return [3 /*break*/, 17];
                }
                return [4 /*yield*/, problem.getSolutions()];
            case 4:
                solutions = _b.sent();
                solution = void 0;
                if (!(solutions.length === 1)) return [3 /*break*/, 5];
                solution = solutions[0];
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, inquirer_1.prompt({
                    type: 'list',
                    name: 'solution',
                    message: 'What is the main solution file',
                    choices: solutions,
                })];
            case 6:
                solution = (_b.sent()).solution;
                _b.label = 7;
            case 7:
                source = path_1.join(problem.id.toString(), solution);
                target = path_1.join(constants_1.ROOT, 'P' + problem.id.toString() + path_1.parse(solution).ext);
                return [4 /*yield*/, better_fs_1.exists(target)];
            case 8:
                if (!_b.sent()) return [3 /*break*/, 15];
                return [4 /*yield*/, better_fs_1.lstat(target)];
            case 9:
                fetchedStat = _b.sent();
                if (!fetchedStat.isSymbolicLink()) return [3 /*break*/, 11];
                return [4 /*yield*/, better_fs_1.readlink(target)];
            case 10:
                link = _b.sent();
                if (link === source) {
                    return [3 /*break*/, 17];
                }
                _b.label = 11;
            case 11: return [4 /*yield*/, inquirer_1.prompt({
                    type: 'confirm',
                    name: 'overwrite',
                    message: "Would you overwrite " + target + "?",
                })];
            case 12:
                overwrite = (_b.sent()).overwrite;
                if (!overwrite) return [3 /*break*/, 14];
                return [4 /*yield*/, better_fs_1.unlink(target)];
            case 13:
                _b.sent();
                return [3 /*break*/, 15];
            case 14:
                log(console_1.chalk.yellow, 'Update passed.');
                return [3 /*break*/, 17];
            case 15: return [4 /*yield*/, better_fs_1.symlink(source, target, 'file')];
            case 16:
                _b.sent();
                log(chalk_1.blue, 'Updated.');
                _b.label = 17;
            case 17:
                problemList_1_1 = problemList_1.next();
                return [3 /*break*/, 3];
            case 18: return [3 /*break*/, 21];
            case 19:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 21];
            case 20:
                try {
                    if (problemList_1_1 && !problemList_1_1.done && (_a = problemList_1.return)) _a.call(problemList_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 21: return [2 /*return*/];
        }
    });
}); })();
