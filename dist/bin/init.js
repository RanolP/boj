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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var better_fs_1 = require("../src/better-fs");
var path_1 = require("path");
var constants_1 = require("../src/constants");
var baekjoon_1 = require("../src/api/baekjoon");
var inquirer_1 = require("inquirer");
var inquirer_autocomplete_prompt_1 = __importDefault(require("inquirer-autocomplete-prompt"));
var console_1 = require("../src/util/console");
var problem_1 = require("../src/problem");
var cache_1 = require("../src/cache");
var minimist_1 = __importDefault(require("minimist"));
inquirer_1.registerPrompt('autocomplete', inquirer_autocomplete_prompt_1.default);
var _a = __read(cache_1.permastate(function () { return 1; }, function () { return 'order'; }, cache_1.Duration.of({ hour: 24 }), {
    useAbsoluteDate: true,
}), 2), order = _a[0], setOrder = _a[1];
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var id, base, _a, create, warning, problemPath, now, year, month, day, problemDifficulty, _b, _c, _d, _e, _f, _g, problem, solutions, extension, shouldCreate, _h, templatePath, template, _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                id = minimist_1.default(process.argv.slice(2)).id;
                if (!!id) return [3 /*break*/, 2];
                return [4 /*yield*/, inquirer_1.prompt({
                        type: 'autocomplete',
                        name: 'id',
                        message: 'Search BOJ Problem',
                        source: function (_, query) { return baekjoon_1.searchProblem(query || ''); },
                    })];
            case 1:
                id = (_k.sent()).id;
                _k.label = 2;
            case 2:
                base = new console_1.Logger('init');
                _a = base.labeled({
                    create: console_1.chalk.green,
                    warning: console_1.chalk.yellow,
                }), create = _a.create, warning = _a.warning;
                problemPath = path_1.join(constants_1.ROOT, id.toString());
                return [4 /*yield*/, better_fs_1.notExists(problemPath)];
            case 3:
                if (!_k.sent()) return [3 /*break*/, 5];
                return [4 /*yield*/, better_fs_1.mkdirs(problemPath)];
            case 4:
                _k.sent();
                create("Folder for " + id);
                _k.label = 5;
            case 5: return [4 /*yield*/, better_fs_1.notExists(path_1.join(problemPath, 'meta.json'))];
            case 6:
                if (!_k.sent()) return [3 /*break*/, 12];
                now = new Date();
                year = now.getFullYear();
                month = (now.getMonth() + 1).toString().padStart(2, '0');
                day = now.getDate().toString().padStart(2, '0');
                return [4 /*yield*/, inquirer_1.prompt([
                        {
                            type: 'list',
                            name: 'extension',
                            message: 'Problem Difficulty',
                            choices: ['A', 'B', 'C'],
                        },
                    ])];
            case 7:
                problemDifficulty = (_k.sent()).problemDifficulty;
                _b = better_fs_1.writeFile;
                _c = [path_1.join(problemPath, 'meta.json')];
                _e = (_d = JSON).stringify;
                _f = {
                    date: year + "-" + month + "-" + day,
                    lastUpdate: year + "-" + month + "-" + day,
                    status: 'in-progress',
                    type: 'daily-boj'
                };
                return [4 /*yield*/, order()];
            case 8: return [4 /*yield*/, _b.apply(void 0, _c.concat([_e.apply(_d, [(_f.order = _k.sent(),
                            _f.love = undefined,
                            _f.problemDifficulty = problemDifficulty,
                            _f), null,
                        '  '])]))];
            case 9:
                _k.sent();
                _g = setOrder;
                return [4 /*yield*/, order()];
            case 10: return [4 /*yield*/, _g.apply(void 0, [(_k.sent()) + 1])];
            case 11:
                _k.sent();
                _k.label = 12;
            case 12: return [4 /*yield*/, problem_1.getProblem(id)];
            case 13:
                problem = _k.sent();
                return [4 /*yield*/, problem.getSolutions()];
            case 14:
                solutions = _k.sent();
                if (!(solutions.length === 0)) return [3 /*break*/, 17];
                return [4 /*yield*/, inquirer_1.prompt({
                        type: 'input',
                        name: 'extension',
                        message: 'Solution file extension',
                    })];
            case 15:
                extension = (_k.sent()).extension;
                return [4 /*yield*/, better_fs_1.writeFile(path_1.join(problemPath, 'solution.' + extension), '')];
            case 16:
                _k.sent();
                create("Solution file for " + id);
                _k.label = 17;
            case 17: return [4 /*yield*/, better_fs_1.notExists(problem.noteFile)];
            case 18:
                if (!_k.sent()) return [3 /*break*/, 27];
                if (!!problem.isSolved) return [3 /*break*/, 20];
                return [4 /*yield*/, inquirer_1.prompt({
                        type: 'confirm',
                        name: 'shouldCreate',
                        message: 'Would you create note file?',
                    })];
            case 19:
                _h = _k.sent();
                return [3 /*break*/, 21];
            case 20:
                _h = { shouldCreate: true };
                _k.label = 21;
            case 21:
                shouldCreate = (_h).shouldCreate;
                if (!shouldCreate) return [3 /*break*/, 27];
                templatePath = path_1.join(constants_1.ROOT, 'template', 'Note.template.md');
                return [4 /*yield*/, better_fs_1.exists(templatePath)];
            case 22:
                if (!(_k.sent())) return [3 /*break*/, 24];
                return [4 /*yield*/, better_fs_1.readFile(templatePath, { encoding: 'utf-8' })];
            case 23:
                _j = _k.sent();
                return [3 /*break*/, 25];
            case 24:
                _j = '';
                _k.label = 25;
            case 25:
                template = _j;
                return [4 /*yield*/, better_fs_1.writeFile(problem.noteFile, template)];
            case 26:
                _k.sent();
                if (template.length === 0) {
                    warning('Note.md generated as an empty file.');
                }
                create("Note.md file for " + id);
                _k.label = 27;
            case 27: return [2 /*return*/];
        }
    });
}); })();
