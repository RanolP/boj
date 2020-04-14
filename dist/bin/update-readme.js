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
var constants_1 = require("../src/constants");
var path_1 = require("path");
var pgfm_1 = require("../src/pgfm");
var console_1 = require("../src/util/console");
var problem_1 = require("../src/problem");
var cache_1 = require("../src/cache");
function getLastUpdate(path) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, better_fs_1.lstat(path)];
                case 1: return [2 /*return*/, (_a.sent()).mtime.toISOString()];
            }
        });
    });
}
var fetchLastNoteUpdate = cache_1.cached(function (problem) { return getLastUpdate(problem.noteFile); }, function (problem) { return problem.id + "/last-note-update"; }, cache_1.Duration.of({ day: 14 }));
var fetchLastReadMeUpdate = cache_1.cached(getLastUpdate, 'last-readme-update', cache_1.Duration.of({ day: 14 }));
var fetchLastProblemList = cache_1.cached(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, problem_1.getProblemList()];
        case 1: return [2 /*return*/, (_a.sent()).map(function (problem) { return problem.id; })];
    }
}); }); }, 'last-problem-list', cache_1.Duration.of({ day: 1 }));
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var base, problemList, problemLoggers, _a, info, error, success, problemUpdated, _b, problemList_1, problemList_1_1, problem, log, lastUpdate, _c, noteTemplate, result_1, target_1, e_1_1, templateFile, lastUpdate, _d, template, result, target;
    var e_1, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                base = new console_1.Logger('update-readme');
                return [4 /*yield*/, problem_1.getProblemList()];
            case 1:
                problemList = _f.sent();
                problemLoggers = base.labeled(problemList.map(function (it) { return it.id; }), ['info', 'error', 'success']);
                _a = base.labeled({
                    info: console_1.chalk.blue,
                    error: console_1.chalk.red,
                    success: console_1.chalk.green,
                }, problemList.map(function (it) { return it.id; })), info = _a.info, error = _a.error, success = _a.success;
                _b = problemList.map(function (it) { return it.id; });
                return [4 /*yield*/, fetchLastProblemList()];
            case 2:
                problemUpdated = _b != (_f.sent());
                _f.label = 3;
            case 3:
                _f.trys.push([3, 14, 15, 16]);
                problemList_1 = __values(problemList), problemList_1_1 = problemList_1.next();
                _f.label = 4;
            case 4:
                if (!!problemList_1_1.done) return [3 /*break*/, 13];
                problem = problemList_1_1.value;
                log = problemLoggers[problem.id];
                if (!problem.isSolved) {
                    log(console_1.chalk.yellow, 'Not solved, pass.');
                    return [3 /*break*/, 12];
                }
                return [4 /*yield*/, better_fs_1.notExists(problem.noteFile)];
            case 5:
                if (_f.sent()) {
                    log(console_1.chalk.yellow, 'Note not found, pass.');
                    return [3 /*break*/, 12];
                }
                return [4 /*yield*/, fetchLastNoteUpdate(problem)];
            case 6:
                lastUpdate = _f.sent();
                _c = lastUpdate.fetchKind === 'file';
                if (!_c) return [3 /*break*/, 8];
                return [4 /*yield*/, getLastUpdate(problem.noteFile)];
            case 7:
                _c = (_f.sent()) == lastUpdate;
                _f.label = 8;
            case 8:
                if (_c) {
                    return [3 /*break*/, 12];
                }
                return [4 /*yield*/, better_fs_1.readFile(problem.noteFile, {
                        encoding: 'utf-8',
                    })];
            case 9:
                noteTemplate = _f.sent();
                return [4 /*yield*/, pgfm_1.preprocess(noteTemplate, { problem: problem }, pgfm_1.NoteRuleset)];
            case 10:
                result_1 = _f.sent();
                target_1 = path_1.join(constants_1.ROOT, problem.id.toString(), 'README.md');
                better_fs_1.writeFile(target_1, result_1);
                log(console_1.chalk.green, 'Success.');
                return [4 /*yield*/, fetchLastNoteUpdate.force(problem)];
            case 11:
                _f.sent();
                problemUpdated = true;
                _f.label = 12;
            case 12:
                problemList_1_1 = problemList_1.next();
                return [3 /*break*/, 4];
            case 13: return [3 /*break*/, 16];
            case 14:
                e_1_1 = _f.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 16];
            case 15:
                try {
                    if (problemList_1_1 && !problemList_1_1.done && (_e = problemList_1.return)) _e.call(problemList_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 16:
                templateFile = path_1.join(constants_1.ROOT, 'template', 'README.template.md');
                return [4 /*yield*/, better_fs_1.notExists(templateFile)];
            case 17:
                if (_f.sent()) {
                    error('File not found: template/README.template.md');
                }
                if (!!problemUpdated) return [3 /*break*/, 21];
                return [4 /*yield*/, fetchLastReadMeUpdate(templateFile)];
            case 18:
                lastUpdate = _f.sent();
                _d = lastUpdate.fetchKind === 'file';
                if (!_d) return [3 /*break*/, 20];
                return [4 /*yield*/, getLastUpdate(templateFile)];
            case 19:
                _d = (_f.sent()) == lastUpdate;
                _f.label = 20;
            case 20:
                if (_d) {
                    success('README.md is already up-to-date');
                    return [2 /*return*/];
                }
                _f.label = 21;
            case 21:
                info('Create README.md based on template/README.template.md...');
                return [4 /*yield*/, better_fs_1.readFile(templateFile, {
                        encoding: 'utf-8',
                    })];
            case 22:
                template = _f.sent();
                return [4 /*yield*/, pgfm_1.preprocess(template, {}, pgfm_1.RootRuleset)];
            case 23:
                result = _f.sent();
                target = path_1.join(constants_1.ROOT, 'README.md');
                better_fs_1.writeFile(target, result);
                success('All done!');
                return [2 /*return*/];
        }
    });
}); })();
