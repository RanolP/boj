import { Rule } from '..';
import { getProblemList, Problem } from '../../../problem';
import dedent from 'dedent';
import { fetchProblemLevel, ProblemLevelNameMap } from '../../../api/solvedac';
import { fetchProblemTitle } from '../../../api/baekjoon';
import { join, parse } from 'path';
import { exists } from '../../../better-fs';
import { ROOT } from '../../../constants';

interface ProblemProps {
  problem: Problem;
  dateRowspan: number;
}

export const SolvedTableRule: Rule = {
  name: 'solved-table',
  type: 'root',
  isBlock: true,
  async execute(): Promise<string> {
    const problemList = await getProblemList();
    problemList.sort((a, b) => a.meta.date.localeCompare(b.meta.date));
    const problemListClassified = Object.values(
      problemList.reduce((acc, curr) => {
        let update: ProblemProps[];
        if (curr.meta.date in acc) {
          const origin = acc[curr.meta.date];
          const first = origin[0];
          origin.push({ problem: curr, dateRowspan: 0 });
          origin.sort(
            ({ problem: a }, { problem: b }) => a.meta.order - b.meta.order
          );
          first.dateRowspan = 0;
          origin[0].dateRowspan = origin.length;
          update = origin;
        } else {
          update = [{ problem: curr, dateRowspan: 1 }];
        }
        return {
          ...acc,
          [curr.meta.date]: update,
        };
      }, {} as Record<string, ProblemProps[]>)
    ).flat();
    async function renderProblemLine({
      problem,
      dateRowspan: shouldAddDate,
    }: ProblemProps): Promise<string> {
      const { date, love } = problem.meta;
      const problemLevel = await fetchProblemLevel(problem.id);
      const problemTitle = await fetchProblemTitle(problem.id);

      function createSolutionLink(filename: string, ext: string): string {
        return `<a href="./${problem.id}/${filename}">풀이 (${ext})</a>`;
      }

      let solveCell: string;
      switch (problem.meta.status) {
        case 'solved':
        case 'solved-late': {
          const solution = await problem.getSolutions();
          solveCell =
            solution
              .map((file) => createSolutionLink(file, parse(file).ext))
              .concat(
                (await exists(join(ROOT, problem.id.toString(), 'README.md')))
                  ? [`<a href="./${problem.id}/README.md">노트</a>`]
                  : []
              )
              .join(', ') +
            (problem.meta.status === 'solved-late' ? ' *지각' : '');
          break;
        }
        case 'in-progress': {
          solveCell = '푸는 중';
          break;
        }
        case 'timeout': {
          solveCell = '타임아웃';
          break;
        }
      }

      return [
        '<tr>',
        shouldAddDate > 0 ? `<td rowspan="${shouldAddDate}">${date}</td>` : '',
        dedent`
          <td>
            <a href="http://noj.am/${problem.id}">
              <img src="https://static.solved.ac/tier_small/${
                problemLevel.level
              }.svg" height="16px"/>
              ${ProblemLevelNameMap[problemLevel.level]}, ${
          love ? `LV${love} ` : ''
        }${problem.id} ${problemTitle}
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
      '\n'
    )}
    </table>
    `;
  },
};