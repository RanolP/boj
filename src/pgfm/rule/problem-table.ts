import { Rule } from '.';
import { getProblemList, Problem } from '../../problem';
import dedent from 'dedent';
import { fetchProblemLevel, ProblemLevelNameMap } from '../../api/solvedac';
import { fetchProblemTitle } from '../../api/baekjoon';
import { join, parse } from 'path';
import { exists } from '../../better-fs';
import { ROOT } from '../../constants';

interface ProblemProps {
  problem: Problem;
  dateRowspan: number;
}

export const ProblemTableRule: Rule = {
  name: 'problem-table',
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
            ({ problem: a }, { problem: b }) => b.meta.order - a.meta.order
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
      const { date } = problem.meta;
      const problemLevel = await fetchProblemLevel(problem.id);
      const problemTitle = await fetchProblemTitle(problem.id);
      const solution = await problem.getSolutions();

      function createSolutionLink(filename: string, ext: string): string {
        return `<a href="./${problem.id}/${filename}">풀이 (${ext})</a>`;
      }

      return [
        '<tr>',
        shouldAddDate > 0 ? `<td rowspan="${shouldAddDate}">${date}</td>` : '',
        dedent`
          <td>
            <a href="https://noj.am/${problem.id}">
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
        solution
          .map((file) => createSolutionLink(file, parse(file).ext))
          .concat(
            (await exists(join(ROOT, problem.id.toString(), 'README.md')))
              ? [`<a href="./${problem.id}/README.md">노트</a>`]
              : []
          )
          .join(', '),
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
