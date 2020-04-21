"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const problem_1 = require("../../../lib/problem");
const dedent_1 = __importDefault(require("dedent"));
const solvedac_1 = require("../../../api/solvedac");
const baekjoon_1 = require("../../../api/baekjoon");
const path_1 = require("path");
const better_fs_1 = require("../../../lib/better-fs");
const constants_1 = require("../../../constants");
exports.SolvedTableRule = {
    name: 'solved-table',
    type: 'root',
    isBlock: true,
    async execute() {
        const problemList = await problem_1.getProblemList({ sorted: true });
        const problemListClassified = Object.entries(problemList.reduce((acc, curr) => {
            const currDate = curr.meta.solvedDate || curr.meta.createDate;
            let update;
            if (currDate in acc) {
                const origin = acc[currDate];
                origin.push({ problem: curr, dateRowspan: 0 });
                /*
                origin.sort(
                  ({ problem: a }, { problem: b }) => a.meta.order - b.meta.order,
                );
                */
                origin[0].dateRowspan = origin.length;
                update = origin;
            }
            else {
                update = [{ problem: curr, dateRowspan: 1 }];
            }
            return Object.assign(Object.assign({}, acc), { [currDate]: update });
        }, {}))
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map((tuple) => tuple[1])
            .flat();
        async function renderProblemLine({ problem, dateRowspan: shouldAddDate, }) {
            const { createDate, solvedDate } = problem.meta;
            const problemLevel = await solvedac_1.fetchProblemLevel(problem.id);
            const problemTitle = await baekjoon_1.fetchProblemTitle(problem.id);
            function createSolutionLink(filename, ext) {
                return `<a href="./${problem.id}/${filename}">풀이 (${ext})</a>`;
            }
            let solveCell;
            switch (problem.meta.status) {
                case 'solved': {
                    const solution = await problem.getSolutionList();
                    solveCell =
                        solution
                            .map((file) => createSolutionLink(file, path_1.parse(file).ext))
                            .concat((await better_fs_1.exists(path_1.join(constants_1.ROOT, problem.id.toString(), 'README.md')))
                            ? [`<a href="./${problem.id}/README.md">노트</a>`]
                            : [])
                            .join(', ') + (problem.isTimeout ? ` (→ ${createDate})` : '');
                    break;
                }
                case 'in-progress': {
                    solveCell = problem.isTimeout ? '타임아웃' : '푸는 중';
                    break;
                }
            }
            return [
                '<tr>',
                shouldAddDate > 0
                    ? `<td rowspan="${shouldAddDate}">${solvedDate || createDate}</td>`
                    : '',
                dedent_1.default `
          <td>
            <a href="http://noj.am/${problem.id}">
              <img src="https://static.solved.ac/tier_small/${problemLevel.level}.svg" height="16px"/>
              ${solvedac_1.ProblemLevelNameMap[problemLevel.level]}, ${problem.id} ${problemTitle}
            </a>
          </td>
        `,
                '<td>',
                solveCell,
                '</td>',
                '</tr>',
            ]
                .flat(Infinity)
                .filter(Boolean)
                .join('');
        }
        return dedent_1.default `
    <table>
      <tr>
        <th>날짜</th>
        <th>문제</th>
        <th>풀이</th>
      </tr>
    ${(await Promise.all(problemListClassified.map(renderProblemLine))).join('\n')}
    </table>
    `;
    },
};
