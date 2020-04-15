"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const cache_1 = require("../cache");
async function fetchProblemLevelLogic(id) {
    const response = await node_fetch_1.default(`https://api.solved.ac/problem_level.php?id=${id}`);
    return await response.json();
}
exports.ProblemLevelNameMap = Object.fromEntries([
    'Bronze',
    'Silver',
    'Gold',
    'Platinum',
    'Diamond',
    'Ruby',
].flatMap((tier, tierIndex) => ['V', 'IV', 'III', 'II', 'I'].map((level, levelIndex) => [
    1 + tierIndex * 5 + levelIndex,
    `${tier} ${level}`,
])));
exports.fetchProblemLevel = cache_1.cached(fetchProblemLevelLogic, (id) => `${id}/solved/level`, cache_1.Duration.of({ day: 14 }));
