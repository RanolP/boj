import { notExists } from '../lib/better-fs';
import { chalk, Logger } from '../util/console';
import { getProblemList, Problem } from '../lib/problem';
import { fetchProblemTitle } from '../api/baekjoon';
import { aligned, stringify } from '../util/align';
import { Command } from '@oclif/command';

export default class AnalyzeCommand extends Command {
  public static description = 'Analyze problem status';

  async run() {
    const base = new Logger('analyze');

    const problemList = await getProblemList({ sorted: true });
    const tagged = (
      await Promise.all(
        problemList.map(
          async (it): Promise<Array<[Problem, string]>> => {
            if (!it.isSolved) {
              return [[it, 'Not solved']];
            }
            if (await notExists(it.noteFile)) {
              return [[it, 'Note not found']];
            }
            return [];
          },
        ),
      )
    ).flat();
    const title = aligned(
      await Promise.all(tagged.map(([it]) => fetchProblemTitle(it.id))),
      stringify,
    );

    const problemLoggers = base.labeled(
      tagged.map(([it]) => it.id),
      chalk.yellow,
    );

    for (const [index, [problem, message]] of Object.entries(tagged)) {
      const log = problemLoggers[problem.id];
      log(`${title[Number(index)]}  ${message}`);
    }
  }
}
