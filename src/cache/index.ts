import { Duration } from './duration';
import { ROOT } from '../constants';
import { join, parse } from 'path';
import { exists, readFile, writeFile, mkdirs } from '../better-fs';

export * from './duration';

interface CacheData {
  lastUpdate: number;
  data: string;
}

export function cached<Params extends Array<unknown>, Result>(
  key: (...params: Params) => string,
  duration: Duration,
  body: (...params: Params) => Promise<Result> | Result
): (...params: Params) => Promise<Result> {
  return async (...params) => {
    const now = new Date();
    const cacheFile = join(ROOT, '.boj-cache', key(...params) + '.json');
    const parsed = parse(cacheFile);
    if (!(await exists(parsed.dir))) {
      await mkdirs(parsed.dir);
    }
    if (await exists(cacheFile)) {
      const content = await readFile(cacheFile, { encoding: 'utf-8' });
      try {
        const cacheData = JSON.parse(content) as CacheData;
        const from = new Date(cacheData.lastUpdate);
        const passed = Duration.fromDateRange(from, now);
        if (passed < duration) {
          return JSON.parse(cacheData.data) as Result;
        }
      } catch {
        // do nothing
      }
    }
    const fetched = await body(...params);
    await writeFile(
      cacheFile,
      JSON.stringify({
        lastUpdate: now.toISOString(),
        data: fetched,
      })
    );
    return fetched;
  };
}
