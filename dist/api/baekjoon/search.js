"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cache_1 = require("../../cache");
const node_fetch_1 = __importDefault(require("node-fetch"));
const console_1 = require("../../util/console");
const string_width_1 = __importDefault(require("string-width"));
const align_1 = require("../../util/align");
// Sorry Mr. Baekjoon, but I need this.
const ApplicationId = 'AEWEWTND4P';
const AlgoliaApiKey = '40fa3b88d4994a18f89e692619c9f3f3';
async function searchProblemLogic(query) {
    if (query) {
        try {
            const response = await node_fetch_1.default(`https://${ApplicationId}-dsn.algolia.net/1/indexes/*/queries?x-algolia-application-id=${ApplicationId}&x-algolia-api-key=${AlgoliaApiKey}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Referer: 'https://www.acmicpc.net/',
                },
                body: JSON.stringify({
                    requests: [
                        {
                            indexName: 'Problems',
                            params: `query=${query}`,
                        },
                    ],
                }),
                method: 'POST',
            });
            const { results: [{ hits }], } = (await response.json());
            const id = align_1.aligned(hits.map(({ id }) => id), console_1.chalk.underline);
            const title = align_1.aligned(hits.map(({ title }) => title), align_1.stringify);
            return hits.map((it, index) => {
                let description = '';
                let width = 0;
                for (const char of it.description.replace('\n', ' ').trim()) {
                    const currentWidth = string_width_1.default(char);
                    if (width + currentWidth + 3 > 50) {
                        description += '...';
                        break;
                    }
                    description += char;
                    width += currentWidth;
                }
                return {
                    name: `${id[index]}  ${title[index]}  ${console_1.chalk.gray(description)}`,
                    value: it.id,
                    short: `${it.id} ${it.title}`,
                };
            });
        }
        catch (e) {
            return [JSON.stringify(e)];
        }
    }
    return [`No result for ${query}`];
}
exports.searchProblemLogic = searchProblemLogic;
exports.searchProblem = cache_1.cached(searchProblemLogic, (query) => `boj/search/${query}`, cache_1.Duration.of({ year: 1 }), {
    useFileCache: false,
});
