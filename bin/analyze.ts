import { notExists } from '../src/better-fs';
import { chalk, Logger } from '../src/util/console';
import { getProblemList, Problem } from '../src/problem';
import { fetchProblemTitle } from '../src/api/baekjoon';
import { aligned, stringify } from '../src/util/align';

(async () => {
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
        }
      )
    )
  ).flat();
  const title = aligned(
    await Promise.all(tagged.map(([it]) => fetchProblemTitle(it.id))),
    stringify
  );

  const problemLoggers = base.labeled(
    tagged.map(([it]) => it.id),
    chalk.yellow
  );

  for (const [index, [problem, message]] of Object.entries(tagged)) {
    const log = problemLoggers[problem.id];
    log(`${title[Number(index)]}  ${message}`);
  }
})();
