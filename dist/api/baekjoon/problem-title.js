"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const cache_1 = require("../../cache");
const TITLE_REGEX = /<span id="problem_title">([^<]+)<\/span>/;
async function fetchProblemTitleLogic(id) {
    const response = await node_fetch_1.default(`https://acmicpc.net/problem/${id}`);
    const html = await response.text();
    const match = TITLE_REGEX.exec(html);
    if (match) {
        return match[1].trim();
    }
    else {
        return '&lt;Title Fetch Failed&rt;';
    }
}
exports.fetchProblemTitle = cache_1.cached(fetchProblemTitleLogic, (id) => `${id}/boj/problem-title`, cache_1.Duration.of({ year: 1 }));
