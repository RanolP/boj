import { ProblemInfoTableRule } from './problem-info-table';
import { ProblemTitleRule } from './problem-title';
import { ProblemNumberRule } from './problem-number';
import { ProblemNameRule } from './problem-name';
import { classifyRules } from '..';

export const NoteRuleset = classifyRules([
  ProblemInfoTableRule,
  ProblemTitleRule,
  ProblemNumberRule,
  ProblemNameRule,
]);
