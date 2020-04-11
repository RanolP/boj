import { Rule, NoteContext } from '..';
import { fetchProblemTitle } from '../../../api/baekjoon';

export const ProblemNameRule: Rule<{}, NoteContext> = {
  name: 'problem-name',
  type: 'note',
  isBlock: false,
  execute(_: {}, { problem }: NoteContext): Promise<string> {
    return fetchProblemTitle(problem.id);
  },
};
