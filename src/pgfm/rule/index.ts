import { ProblemTableRule } from './problem-table';
import { LanguageUsageRule } from './language-usage';

export interface Rule<T = {}> {
  name: string;
  execute(data: T): PromiseLike<string> | string;
}

export const WholeRules: Record<string, Rule<unknown>> = Object.fromEntries(
  [ProblemTableRule, LanguageUsageRule].map((problem) => [
    problem.name,
    problem,
  ])
);
