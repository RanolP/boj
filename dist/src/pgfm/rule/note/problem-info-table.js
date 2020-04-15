"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var dedent_1 = __importDefault(require("dedent"));
var solvedac_1 = require("../../../api/solvedac");
var baekjoon_1 = require("../../../api/baekjoon");
exports.ProblemInfoTableRule = {
    name: 'problem-info-table',
    type: 'note',
    isBlock: true,
    execute: function (_, _a) {
        var problem = _a.problem;
        return __awaiter(this, void 0, void 0, function () {
            var love, problemLevel, problemTitle, solveCell;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        love = problem.meta.love;
                        return [4 /*yield*/, solvedac_1.fetchProblemLevel(problem.id)];
                    case 1:
                        problemLevel = _b.sent();
                        return [4 /*yield*/, baekjoon_1.fetchProblemTitle(problem.id)];
                    case 2:
                        problemTitle = _b.sent();
                        switch (problem.meta.status) {
                            case 'solved': {
                                solveCell = '성공';
                                break;
                            }
                            case 'solved-late': {
                                solveCell = '성공 (*지각)';
                                break;
                            }
                            case 'in-progress': {
                                solveCell = '푸는 중';
                                break;
                            }
                            case 'timeout': {
                                solveCell = '타임아웃';
                                break;
                            }
                        }
                        return [2 /*return*/, dedent_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    <table>\n      <tr>\n        <th>\uB7AD\uD06C</th>\n        <th>\uC0C1\uD0DC</th>\n      </tr>\n      <tr>\n        <td>\n          <a href=\"http://noj.am/", "\">\n            <img src=\"https://static.solved.ac/tier_small/", ".svg\" height=\"16px\"/>\n            ", ", ", "", " ", "\n          </a>\n        </td>\n        <td>\n          ", "\n        </td>\n      </tr>\n    </table>\n    "], ["\n    <table>\n      <tr>\n        <th>\uB7AD\uD06C</th>\n        <th>\uC0C1\uD0DC</th>\n      </tr>\n      <tr>\n        <td>\n          <a href=\"http://noj.am/", "\">\n            <img src=\"https://static.solved.ac/tier_small/",
                                ".svg\" height=\"16px\"/>\n            ", ", ",
                                "", " ", "\n          </a>\n        </td>\n        <td>\n          ", "\n        </td>\n      </tr>\n    </table>\n    "])), problem.id, problemLevel.level, solvedac_1.ProblemLevelNameMap[problemLevel.level], love ? "LV" + love + " " : '', problem.id, problemTitle, solveCell)];
                }
            });
        });
    },
};
var templateObject_1;
