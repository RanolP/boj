import { Rule } from '.';
import { getProblemList, Problem } from '../../problem';
import dedent from 'dedent';
import { fetchProblemLevel, ProblemLevelNameMap } from '../../api/solvedac';
import { fetchProblemTitle } from '../../api/baekjoon';
import { join, parse } from 'path';
import { exists } from '../../better-fs';
import { ROOT } from '../../constants';

const ExtensionLanguageNameMap: Record<string, string> = {
  '.rs': 'Rust',
  '.py': 'Python',
};

export const LanguageUsageRule: Rule = {
  name: 'language-usage',
  async execute(): Promise<string> {
    const problemList = await getProblemList();
    const solutions = (
      await Promise.all(
        problemList
          .filter((problem) => problem.isSolved)
          .map((problem) => problem.getSolutions())
      )
    ).flat();
    const ratio = solutions
      .map((solutionPath) => parse(solutionPath).ext)
      .reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: curr in acc ? acc[curr] + 1 : 1,
        }),
        {} as Record<string, number>
      );

    return [
      dedent`
        | 언어 | 사용 비율 |
        | ---- | --------- |
      `,
    ]
      .concat(
        Object.entries(ratio).map(
          ([ext, count]) => dedent`
        | ${
          ExtensionLanguageNameMap[ext] || 'Unknown'
        } (${ext}) | ${count} of ${solutions.length} (${(
            (count / solutions.length) *
            100
          ).toFixed(2)}%) |
      `
        )
      )
      .join('\n');
  },
};
