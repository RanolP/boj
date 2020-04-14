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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cache_1 = require("../../cache");
var node_fetch_1 = __importDefault(require("node-fetch"));
var console_1 = require("../../util/console");
var string_width_1 = __importDefault(require("string-width"));
var align_1 = require("../../util/align");
// Sorry Mr. Baekjoon, but I need this.
var ApplicationId = 'AEWEWTND4P';
var AlgoliaApiKey = '40fa3b88d4994a18f89e692619c9f3f3';
function searchProblemLogic(query) {
    return __awaiter(this, void 0, void 0, function () {
        var response, _a, hits, id_1, title_1, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!query) return [3 /*break*/, 5];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, node_fetch_1.default("https://" + ApplicationId + "-dsn.algolia.net/1/indexes/*/queries?x-algolia-application-id=" + ApplicationId + "&x-algolia-api-key=" + AlgoliaApiKey, {
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/x-www-form-urlencoded',
                                Referer: 'https://www.acmicpc.net/',
                            },
                            body: JSON.stringify({
                                requests: [
                                    {
                                        indexName: 'Problems',
                                        params: "query=" + query,
                                    },
                                ],
                            }),
                            method: 'POST',
                        })];
                case 2:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    _a = __read.apply(void 0, [(_b.sent()).results, 1]), hits = _a[0].hits;
                    id_1 = align_1.aligned(hits.map(function (_a) {
                        var id = _a.id;
                        return id;
                    }), console_1.chalk.underline);
                    title_1 = align_1.aligned(hits.map(function (_a) {
                        var title = _a.title;
                        return title;
                    }), align_1.stringify);
                    return [2 /*return*/, hits.map(function (it, index) {
                            var e_2, _a;
                            var description = '';
                            var width = 0;
                            try {
                                for (var _b = __values(it.description.replace('\n', ' ').trim()), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var char = _c.value;
                                    var currentWidth = string_width_1.default(char);
                                    if (width + currentWidth + 3 > 50) {
                                        description += '...';
                                        break;
                                    }
                                    description += char;
                                    width += currentWidth;
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                            return {
                                name: id_1[index] + "  " + title_1[index] + "  " + console_1.chalk.gray(description),
                                value: it.id,
                                short: it.id + " " + it.title,
                            };
                        })];
                case 4:
                    e_1 = _b.sent();
                    return [2 /*return*/, [JSON.stringify(e_1)]];
                case 5: return [2 /*return*/, ["No result for " + query]];
            }
        });
    });
}
exports.searchProblemLogic = searchProblemLogic;
exports.searchProblem = cache_1.cached(searchProblemLogic, function (query) { return "boj/search/" + query; }, cache_1.Duration.of({ year: 1 }), {
    useFileCache: false,
});
