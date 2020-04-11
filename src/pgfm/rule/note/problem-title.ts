import { Rule, NoteContext } from '..';
import { fetchProblemTitle } from '../../../api/baekjoon';

export const ProblemTitleRule: Rule<{}, NoteContext> = {
  name: 'problem-title',
  type: 'note',
  isBlock: false,
  async execute(_: {}, { problem }: NoteContext): Promise<string> {
    return `${problem.id} ${await fetchProblemTitle(problem.id)}`;
  },
};
