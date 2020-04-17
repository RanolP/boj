import { Rule } from '..';
import { getProblemList, Problem } from '../../../lib/problem';
import dedent from 'dedent';
import { fetchProblemLevel, ProblemLevelNameMap } from '../../../api/solvedac';
import { fetchProblemTitle } from '../../../api/baekjoon';
import { join, parse } from 'path';
import { exists } from '../../../lib/better-fs';
import { ROOT } from '../../../constants';
import { Duration } from '../../../cache';

interface ProblemProps {
  problem: Problem;
  dateRowspan: number;
}

export const SolvedTableRule: Rule = {
  name: 'solved-table',
  type: 'root',
  isBlock: true,
  async execute(): Promise<string> {
    const problemList = await getProblemList({ sorted: true });
    const problemListClassified = Object.values(
      problemList.reduce((acc, curr) => {
        let update: ProblemProps[];
        if (curr.meta.solvedDate in acc) {
          const origin = acc[curr.meta.solvedDate];
          const first = origin[0];
          origin.push({ problem: curr, dateRowspan: 0 });
          origin.sort(
            ({ problem: a }, { problem: b }) => a.meta.order - b.meta.order,
          );
          first.dateRowspan = 0;
          origin[0].dateRowspan = origin.length;
          update = origin;
        } else {
          update = [{ problem: curr, dateRowspan: 1 }];
        }
        return {
          ...acc,
          [curr.meta.solvedDate]: update,
        };
      }, {} as Record<string, ProblemProps[]>),
    ).flat();
    async function renderProblemLine({
      problem,
      dateRowspan: shouldAddDate,
    }: ProblemProps): Promise<string> {
      const { createDate, solvedDate } = problem.meta;
      const problemLevel = await fetchProblemLevel(problem.id);
      const problemTitle = await fetchProblemTitle(problem.id);
      function createSolutionLink(filename: string, ext: string): string {
        return `<a href="./${problem.id}/${filename}">풀이 (${ext})</a>`;
      }

      let solveCell: string;
      switch (problem.meta.status) {
        case 'solved': {
          const solution = await problem.getSolutions();
          solveCell =
            solution
              .map((file) => createSolutionLink(file, parse(file).ext))
              .concat(
                (await exists(join(ROOT, problem.id.toString(), 'README.md')))
                  ? [`<a href="./${problem.id}/README.md">노트</a>`]
                  : [],
              )
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
          ? `<td rowspan="${shouldAddDate}">${solvedDate}</td>`
          : '',
        dedent`
          <td>
            <a href="http://noj.am/${problem.id}">
              <img src="https://static.solved.ac/tier_small/${
                problemLevel.level
              }.svg" height="16px"/>
              ${ProblemLevelNameMap[problemLevel.level]}, ${
          problem.id
        } ${problemTitle}
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

    return dedent`
    <table>
      <tr>
        <th>날짜</th>
        <th>문제</th>
        <th>풀이</th>
      </tr>
    ${(await Promise.all(problemListClassified.map(renderProblemLine))).join(
      '\n',
    )}
    </table>
    `;
  },
};
