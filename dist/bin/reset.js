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
var inquirer_1 = require("inquirer");
var console_1 = require("../src/util/console");
var problem_1 = require("../src/problem");
var better_fs_1 = require("../src/better-fs");
var constants_1 = require("../src/constants");
var path_1 = require("path");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var warning, reset, problemList, problemList_1, problemList_1_1, problem, e_1_1;
    var e_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                warning = new console_1.Logger('reset').labeled({
                    warning: console_1.chalk.yellow,
                }).warning;
                return [4 /*yield*/, inquirer_1.prompt({
                        type: 'confirm',
                        name: 'reset',
                        message: "Would you reset whole repository?",
                    })];
            case 1:
                reset = (_b.sent()).reset;
                if (!reset) {
                    warning('Action aborted by user.');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, problem_1.getProblemList()];
            case 2:
                problemList = _b.sent();
                _b.label = 3;
            case 3:
                _b.trys.push([3, 8, 9, 10]);
                problemList_1 = __values(problemList), problemList_1_1 = problemList_1.next();
                _b.label = 4;
            case 4:
                if (!!problemList_1_1.done) return [3 /*break*/, 7];
                problem = problemList_1_1.value;
                return [4 /*yield*/, better_fs_1.rimraf(path_1.join(constants_1.ROOT, problem.id.toString()))];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                problemList_1_1 = problemList_1.next();
                return [3 /*break*/, 4];
            case 7: return [3 /*break*/, 10];
            case 8:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 10];
            case 9:
                try {
                    if (problemList_1_1 && !problemList_1_1.done && (_a = problemList_1.return)) _a.call(problemList_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 10: return [4 /*yield*/, better_fs_1.rimraf(path_1.join(constants_1.ROOT, '.boj-cache'))];
            case 11:
                _b.sent();
                return [4 /*yield*/, better_fs_1.rimraf(path_1.join(constants_1.ROOT, 'README.md'))];
            case 12:
                _b.sent();
                return [4 /*yield*/, better_fs_1.rimraf(constants_1.ROOT, {
                        file: function (_, stat) { return stat.isSymbolicLink(); },
                        folder: function () { return false; },
                    })];
            case 13:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); })();
