import { Rule } from '..';
import { getProblemList } from '../../../lib/problem';
import dedent from 'dedent';
import { parse, join } from 'path';
import { Languages, ExtensionLanguagesMap } from '../../../lib/language';
import { ROOT } from '../../../constants';
import { rimraf, notExists, mkdirs, writeFile } from '../../../lib/better-fs';
import { PieChart } from '../../../lib/chart';
import { createHash } from 'crypto';

const ExtensionLanguageNameMap: Record<string, string> = Object.fromEntries(
  Languages.map(({ name, fileExtension }) => [fileExtension, name]),
);

export const LanguageUsageRule: Rule = {
  name: 'language-usage',
  type: 'root',
  isBlock: true,
  initialize(): Promise<void> {
    const dir = join(ROOT, 'boj-public', 'language-usage');
    return rimraf(dir);
  },
  async execute(): Promise<string> {
    const problemList = await getProblemList();
    const solutions = (
      await Promise.all(
        problemList
          .filter((problem) => problem.isSolved)
          .map((problem) => problem.getSolutionList()),
      )
    ).flat();
    const ratio = Object.entries(
      solutions
        .map((solutionPath) => parse(solutionPath).ext)
        .reduce(
          (acc, curr) => ({
            ...acc,
            [curr]: curr in acc ? acc[curr] + 1 : 1,
          }),
          {} as Record<string, number>,
        ),
    ).sort((a, b) => a[1] - b[1]);
    const chart = new PieChart();
    let other = 0;
    for (const [ext, count] of ratio) {
      const languages = ExtensionLanguagesMap[ext] ?? [];
      if (languages.length !== 1) {
        other += count;
      } else {
        chart.add({
          color: languages[0].color,
          label: languages[0].name,
          value: count,
        });
      }
    }
    if (other > 0) {
      chart.add({
        color: '#d2d2d2',
        label: 'Other',
        value: other,
      });
    }
    const dir = join(ROOT, 'boj-public', 'language-usage');
    if (await notExists(dir)) {
      await mkdirs(dir);
    }
    const graph = chart.render();
    const filename = createHash('md5').update(graph).digest('hex') + '.svg';
    await writeFile(join(dir, filename), graph, { encoding: 'utf-8' });

    return [
      dedent`
        | 언어 | 사용 비율 |
        | ---- | --------- |
      `,
      ...ratio.map(
        ([ext, count]) => dedent`
        | ${
          ExtensionLanguageNameMap[ext] ?? 'Unknown'
        } (${ext}) | ${count} of ${solutions.length} (${(
          (count / solutions.length) *
          100
        ).toFixed(2)}%) |
      `,
      ),
      '',
      `![pie-chart](${'.'}/boj-public/language-usage/${filename})`,
    ].join('\n');
  },
};
