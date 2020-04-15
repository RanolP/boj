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
var inquirer_checkbox_plus_prompt_1 = __importDefault(require("inquirer-checkbox-plus-prompt"));
var console_1 = require("../src/util/console");
var problem_1 = require("../src/problem");
var cache_1 = require("../src/cache");
var minimist_1 = __importDefault(require("minimist"));
var language_1 = require("../src/util/language");
var fuzzy_1 = require("fuzzy");
inquirer_1.registerPrompt('autocomplete', inquirer_autocomplete_prompt_1.default);
inquirer_1.registerPrompt('checkbox-plus', inquirer_checkbox_plus_prompt_1.default);
var _a = __read(cache_1.permastate(function () { return 1; }, function () { return 'order'; }, cache_1.Duration.of({ hour: 24 }), {
    useAbsoluteDate: true,
}), 2), order = _a[0], setOrder = _a[1];
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var id, base, _a, create, warning, problemPath, now, year, month, day, problemDifficulty, _b, _c, _d, _e, _f, _g, problem, solutions, language_2, source, sourceType, templateDirectory_1, files_1, main_1, templateToUse, concatenated, _h, _j, _k, shouldCreate, _l, templatePath, template, _m;
    return __generator(this, function (_o) {
        switch (_o.label) {
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
                id = (_o.sent()).id;
                _o.label = 2;
            case 2:
                base = new console_1.Logger('init');
                _a = base.labeled({
                    create: console_1.chalk.green,
                    warning: console_1.chalk.yellow,
                }), create = _a.create, warning = _a.warning;
                problemPath = path_1.join(constants_1.ROOT, id.toString());
                return [4 /*yield*/, better_fs_1.notExists(problemPath)];
            case 3:
                if (!_o.sent()) return [3 /*break*/, 5];
                return [4 /*yield*/, better_fs_1.mkdirs(problemPath)];
            case 4:
                _o.sent();
                create("Folder for " + id);
                _o.label = 5;
            case 5: return [4 /*yield*/, better_fs_1.notExists(path_1.join(problemPath, 'meta.json'))];
            case 6:
                if (!_o.sent()) return [3 /*break*/, 12];
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
                problemDifficulty = (_o.sent()).problemDifficulty;
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
            case 8: return [4 /*yield*/, _b.apply(void 0, _c.concat([_e.apply(_d, [(_f.order = _o.sent(),
                            _f.love = undefined,
                            _f.problemDifficulty = problemDifficulty,
                            _f), null,
                        '  '])]))];
            case 9:
                _o.sent();
                _g = setOrder;
                return [4 /*yield*/, order()];
            case 10: return [4 /*yield*/, _g.apply(void 0, [(_o.sent()) + 1])];
            case 11:
                _o.sent();
                _o.label = 12;
            case 12: return [4 /*yield*/, problem_1.getProblem(id)];
            case 13:
                problem = _o.sent();
                return [4 /*yield*/, problem.getSolutions()];
            case 14:
                solutions = _o.sent();
                if (!(solutions.length === 0)) return [3 /*break*/, 25];
                return [4 /*yield*/, inquirer_1.prompt({
                        type: 'autocomplete',
                        name: 'language',
                        message: 'Language',
                        source: function (_, query) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, [
                                        {
                                            name: 'Select it later',
                                            value: undefined,
                                        },
                                    ].concat(language_1.searchLanguage(query || ''))];
                            });
                        }); },
                    })];
            case 15:
                language_2 = (_o.sent()).language;
                if (!language_2) return [3 /*break*/, 25];
                source = '';
                sourceType = 'empty';
                templateDirectory_1 = path_1.join(constants_1.ROOT, 'template', language_2.id);
                return [4 /*yield*/, better_fs_1.exists(templateDirectory_1)];
            case 16:
                if (!_o.sent()) return [3 /*break*/, 23];
                return [4 /*yield*/, better_fs_1.readdir(templateDirectory_1)];
            case 17:
                files_1 = (_o.sent())
                    .map(function (it) { return path_1.parse(it); })
                    .filter(function (it) { return it.ext === language_2.fileExtension; });
                main_1 = 'main' + language_2.fileExtension;
                return [4 /*yield*/, inquirer_1.prompt({
                        type: 'checkbox-plus',
                        name: 'templateToUse',
                        message: 'Templates',
                        default: files_1.some(function (it) { return it.base === main_1; }) ? [main_1] : [],
                        source: function (_, query) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, fuzzy_1.filter(query || '', files_1, {
                                        extract: function (_a) {
                                            var base = _a.base;
                                            return base;
                                        },
                                    }).map(function (_a) {
                                        var original = _a.original;
                                        return ({
                                            name: original.name,
                                            value: original.base,
                                            short: original.name,
                                        });
                                    })];
                            });
                        }); },
                        highlight: true,
                        searchable: true,
                    })];
            case 18:
                templateToUse = (_o.sent()).templateToUse;
                return [4 /*yield*/, Promise.all(templateToUse
                        .filter(function (it) { return it !== main_1; })
                        .map(function (it) {
                        return better_fs_1.readFile(path_1.join(templateDirectory_1, it), { encoding: 'utf-8' });
                    }))];
            case 19:
                concatenated = _o.sent();
                _j = (_h = concatenated
                    .map(function (it) { return it.trim(); })).concat;
                if (!templateToUse.some(function (it) { return it === main_1; })) return [3 /*break*/, 21];
                return [4 /*yield*/, better_fs_1.readFile(path_1.join(templateDirectory_1, main_1), {
                        encoding: 'utf-8',
                    })];
            case 20:
                _k = [
                    (_o.sent()).trim()
                ];
                return [3 /*break*/, 22];
            case 21:
                _k = [];
                _o.label = 22;
            case 22:
                source =
                    _j.apply(_h, [_k])
                        .join('\n\n') + '\n';
                sourceType = 'template';
                _o.label = 23;
            case 23: return [4 /*yield*/, better_fs_1.writeFile(path_1.join(problemPath, 'solution' + language_2.fileExtension), source)];
            case 24:
                _o.sent();
                create("Solution file for " + id + " (" + sourceType + ")");
                _o.label = 25;
            case 25: return [4 /*yield*/, better_fs_1.notExists(problem.noteFile)];
            case 26:
                if (!_o.sent()) return [3 /*break*/, 35];
                if (!!problem.isSolved) return [3 /*break*/, 28];
                return [4 /*yield*/, inquirer_1.prompt({
                        type: 'confirm',
                        name: 'shouldCreate',
                        message: 'Would you create note file?',
                    })];
            case 27:
                _l = _o.sent();
                return [3 /*break*/, 29];
            case 28:
                _l = { shouldCreate: true };
                _o.label = 29;
            case 29:
                shouldCreate = (_l).shouldCreate;
                if (!shouldCreate) return [3 /*break*/, 35];
                templatePath = path_1.join(constants_1.ROOT, 'template', 'Note.template.md');
                return [4 /*yield*/, better_fs_1.exists(templatePath)];
            case 30:
                if (!(_o.sent())) return [3 /*break*/, 32];
                return [4 /*yield*/, better_fs_1.readFile(templatePath, { encoding: 'utf-8' })];
            case 31:
                _m = _o.sent();
                return [3 /*break*/, 33];
            case 32:
                _m = '';
                _o.label = 33;
            case 33:
                template = _m;
                return [4 /*yield*/, better_fs_1.writeFile(problem.noteFile, template)];
            case 34:
                _o.sent();
                if (template.length === 0) {
                    warning('Note.md generated as an empty file.');
                }
                create("Note.md file for " + id);
                _o.label = 35;
            case 35: return [2 /*return*/];
        }
    });
}); })();
