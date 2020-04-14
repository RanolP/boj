"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var problem_1 = require("../../../problem");
var dedent_1 = __importDefault(require("dedent"));
var solvedac_1 = require("../../../api/solvedac");
var baekjoon_1 = require("../../../api/baekjoon");
var path_1 = require("path");
var better_fs_1 = require("../../../better-fs");
var constants_1 = require("../../../constants");
exports.SolvedTableRule = {
    name: 'solved-table',
    type: 'root',
    isBlock: true,
    execute: function () {
        return __awaiter(this, void 0, void 0, function () {
            function renderProblemLine(_a) {
                var problem = _a.problem, shouldAddDate = _a.dateRowspan;
                return __awaiter(this, void 0, void 0, function () {
                    function createSolutionLink(filename, ext) {
                        return "<a href=\"./" + problem.id + "/" + filename + "\">\uD480\uC774 (" + ext + ")</a>";
                    }
                    var _b, date, love, problemDifficulty, problemLevel, problemTitle, solveCell, _c, solution, _d, _e;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                _b = problem.meta, date = _b.date, love = _b.love, problemDifficulty = _b.problemDifficulty;
                                return [4 /*yield*/, solvedac_1.fetchProblemLevel(problem.id)];
                            case 1:
                                problemLevel = _f.sent();
                                return [4 /*yield*/, baekjoon_1.fetchProblemTitle(problem.id)];
                            case 2:
                                problemTitle = _f.sent();
                                _c = problem.meta.status;
                                switch (_c) {
                                    case 'solved': return [3 /*break*/, 3];
                                    case 'solved-late': return [3 /*break*/, 3];
                                    case 'in-progress': return [3 /*break*/, 6];
                                    case 'timeout': return [3 /*break*/, 7];
                                }
                                return [3 /*break*/, 8];
                            case 3: return [4 /*yield*/, problem.getSolutions()];
                            case 4:
                                solution = _f.sent();
                                _e = (_d = solution
                                    .map(function (file) { return createSolutionLink(file, path_1.parse(file).ext); })).concat;
                                return [4 /*yield*/, better_fs_1.exists(path_1.join(constants_1.ROOT, problem.id.toString(), 'README.md'))];
                            case 5:
                                solveCell =
                                    _e.apply(_d, [(_f.sent())
                                            ? ["<a href=\"./" + problem.id + "/README.md\">\uB178\uD2B8</a>"]
                                            : []])
                                        .join(', ') +
                                        (problem.meta.status === 'solved-late' ? ' *지각' : '');
                                return [3 /*break*/, 8];
                            case 6:
                                {
                                    solveCell = '푸는 중';
                                    return [3 /*break*/, 8];
                                }
                                _f.label = 7;
                            case 7:
                                {
                                    solveCell = '타임아웃';
                                    return [3 /*break*/, 8];
                                }
                                _f.label = 8;
                            case 8: return [2 /*return*/, [
                                    '<tr>',
                                    shouldAddDate > 0 ? "<td rowspan=\"" + shouldAddDate + "\">" + date + "</td>" : '',
                                    dedent_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          <td>\n            <a href=\"http://noj.am/", "\">\n              <img src=\"https://static.solved.ac/tier_small/", ".svg\" height=\"16px\"/>\n              ", ", ", "", "", " ", "\n            </a>\n          </td>\n        "], ["\n          <td>\n            <a href=\"http://noj.am/", "\">\n              <img src=\"https://static.solved.ac/tier_small/",
                                        ".svg\" height=\"16px\"/>\n              ", ", ",
                                        "", "",
                                        " ", "\n            </a>\n          </td>\n        "])), problem.id, problemLevel.level, solvedac_1.ProblemLevelNameMap[problemLevel.level], love ? "LV" + love + " (Legacy) " : '', problemDifficulty ? problemDifficulty + " " : '', problem.id, problemTitle),
                                    '<td>',
                                    solveCell,
                                    '</td>',
                                    '</tr>',
                                ]
                                    .flat(Infinity)
                                    .filter(Boolean)
                                    .join('')];
                        }
                    });
                });
            }
            var problemList, problemListClassified, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, problem_1.getProblemList({ sorted: true })];
                    case 1:
                        problemList = _c.sent();
                        problemListClassified = Object.values(problemList.reduce(function (acc, curr) {
                            var _a;
                            var update;
                            if (curr.meta.date in acc) {
                                var origin = acc[curr.meta.date];
                                var first = origin[0];
                                origin.push({ problem: curr, dateRowspan: 0 });
                                origin.sort(function (_a, _b) {
                                    var a = _a.problem;
                                    var b = _b.problem;
                                    return a.meta.order - b.meta.order;
                                });
                                first.dateRowspan = 0;
                                origin[0].dateRowspan = origin.length;
                                update = origin;
                            }
                            else {
                                update = [{ problem: curr, dateRowspan: 1 }];
                            }
                            return __assign(__assign({}, acc), (_a = {}, _a[curr.meta.date] = update, _a));
                        }, {})).flat();
                        _a = dedent_1.default;
                        _b = [templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    <table>\n      <tr>\n        <th>\uB0A0\uC9DC</th>\n        <th>\uBB38\uC81C</th>\n        <th>\uD480\uC774</th>\n      </tr>\n    ", "\n    </table>\n    "], ["\n    <table>\n      <tr>\n        <th>\uB0A0\uC9DC</th>\n        <th>\uBB38\uC81C</th>\n        <th>\uD480\uC774</th>\n      </tr>\n    ",
                                "\n    </table>\n    "]))];
                        return [4 /*yield*/, Promise.all(problemListClassified.map(renderProblemLine))];
                    case 2: return [2 /*return*/, _a.apply(void 0, _b.concat([(_c.sent()).join('\n')]))];
                }
            });
        });
    },
};
var templateObject_1, templateObject_2;
