"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dedent_1 = __importDefault(require("dedent"));
const solvedac_1 = require("../../../api/solvedac");
const baekjoon_1 = require("../../../api/baekjoon");
exports.ProblemInfoTableRule = {
    name: 'problem-info-table',
    type: 'note',
    isBlock: true,
    async execute(_, { problem }) {
        const problemLevel = await solvedac_1.fetchProblemLevel(problem.id);
        const problemTitle = await baekjoon_1.fetchProblemTitle(problem.id);
        let solveCell;
        switch (problem.meta.status) {
            case 'solved': {
                solveCell = problem.isTimeout
                    ? `성공 (→ ${problem.meta.createDate})`
                    : '성공';
                break;
            }
            case 'in-progress': {
                solveCell = problem.isTimeout ? '타임아웃' : '푸는 중';
                break;
            }
        }
        return dedent_1.default `
    <table>
      <tr>
        <th>랭크</th>
        <th>상태</th>
      </tr>
      <tr>
        <td>
          <a href="http://noj.am/${problem.id}">
            <img src="https://static.solved.ac/tier_small/${problemLevel.level}.svg" height="16px"/>
            ${solvedac_1.ProblemLevelNameMap[problemLevel.level]}, ${problem.id} ${problemTitle}
          </a>
        </td>
        <td>
          ${solveCell}
        </td>
      </tr>
    </table>
    `;
    },
};
