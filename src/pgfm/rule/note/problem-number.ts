import { Rule, NoteContext } from '..';

export const ProblemNumberRule: Rule<{}, NoteContext> = {
  name: 'problem-number',
  type: 'note',
  isBlock: false,
  execute(_: {}, { problem }: NoteContext): string {
    return `${problem.id}`;
  },
};
