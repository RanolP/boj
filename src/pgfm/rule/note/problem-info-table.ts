import { Rule, NoteContext } from '..';
import dedent from 'dedent';
import { fetchProblemLevel, ProblemLevelNameMap } from '../../../api/solvedac';
import { fetchProblemTitle } from '../../../api/baekjoon';

export const ProblemInfoTableRule: Rule<{}, NoteContext> = {
  name: 'problem-info-table',
  type: 'note',
  isBlock: true,
  async execute(_: {}, { problem }: NoteContext): Promise<string> {
    const { love } = problem.meta;
    const problemLevel = await fetchProblemLevel(problem.id);
    const problemTitle = await fetchProblemTitle(problem.id);

    let solveCell: string;
    switch (problem.meta.status) {
      case 'solved': {
        solveCell = '성공';
        break;
      }
      case 'solved-late': {
        solveCell = '성공 (*지각)';
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

    return dedent`
    <table>
      <tr>
        <th>랭크</th>
        <th>상태</th>
      </tr>
      <tr>
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
        <td>
          ${solveCell}
        </td>
      </tr>
    </table>
    `;
  },
};
