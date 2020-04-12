import { Duration } from './duration';
import { ROOT } from '../constants';
import { join, parse } from 'path';
import { exists, readFile, writeFile, mkdirs } from '../better-fs';

export * from './duration';

interface CacheData {
  lastUpdate: number;
  data: any;
}

export type FetchKind = 'fetch' | 'file' | 'expired';

export type NoFetchKind<T> = ('fetchKind' extends keyof T ? never : T) & T;

export type Fetched<T> = T & { fetchKind: FetchKind };

export function cached<Params extends Array<any>, Result>(
  body: (
    ...params: Params
  ) => Promise<NoFetchKind<Result>> | NoFetchKind<Result>,
  key: string | ((...params: Params) => string),
  duration: Duration
): (...params: Params) => Promise<Fetched<Result>> {
  const memCache = {} as Record<string, Fetched<Result>>;
  return async (...params): Promise<Fetched<Result>> => {
    const currentKey = typeof key === 'function' ? key(...params) : key;
    if (memCache[currentKey]) {
      return memCache[currentKey];
    }
    const now = new Date();
    const cacheFile = join(ROOT, '.boj-cache', currentKey + '.json');
    const parsed = parse(cacheFile);
    if (!(await exists(parsed.dir))) {
      await mkdirs(parsed.dir);
    }
    let fetchKind: FetchKind = 'fetch' as const;
    if (await exists(cacheFile)) {
      const content = await readFile(cacheFile, { encoding: 'utf-8' });
      try {
        const { lastUpdate, data } = JSON.parse(content) as CacheData;
        const from = new Date(lastUpdate);
        const passed = Duration.fromDateRange(from, now);
        if (passed < duration) {
          const result = Object.assign(data as Result, {
            fetchKind: 'file' as const,
          });
          memCache[currentKey] = result;
          return result;
        }
      } catch {
        // do nothing
      }
      fetchKind = 'expired' as const;
    }
    const fetched = Object.assign(await body.apply(fetchKind, params), {
      fetchKind,
    });
    memCache[currentKey] = fetched;
    await writeFile(
      cacheFile,
      JSON.stringify(
        {
          lastUpdate: now.toISOString(),
          data: fetched,
        },
        null,
        '  '
      )
    );
    return memCache[currentKey];
  };
}
