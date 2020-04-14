import { Duration } from './duration';
import { ROOT } from '../constants';
import { join, parse } from 'path';
import { exists, readFile, writeFile, mkdirs, notExists } from '../better-fs';

export * from './duration';

interface CacheData {
  lastUpdate: number;
  data: any;
}

export type FetchKind = 'fetch' | 'file' | 'expired' | 'force-fetch';

export type NoFetchKind<T> = ('fetchKind' extends keyof T ? never : T) & T;

export type Fetched<T> = T & { fetchKind: FetchKind };

export type CacheOptions = Partial<{
  useFileCache: boolean;
  useAbsoluteDate: boolean;
}>;

type ShiftArray<T, A extends any[]> = Parameters<(a: T, ...b: A) => void>;

export function permastate<Params extends any[], T>(
  initial: (...params: Params) => Promise<NoFetchKind<T>> | NoFetchKind<T>,
  key: (...params: Params) => string,
  duration: Duration,
  options: CacheOptions = {}
): [
  (...params: Params) => Promise<Fetched<T>>,
  (...params: ShiftArray<NoFetchKind<T>, Params>) => Promise<Fetched<T>>
] {
  return [
    cached(initial, key, duration, options),
    cached(
      (...[v]: ShiftArray<NoFetchKind<T>, Params>) => v,
      (...[_, ...params]: ShiftArray<NoFetchKind<T>, Params>) =>
        key(...(params as Params)),
      Duration.of({})
    ),
  ];
}

export function cached<Params extends Array<any>, Result>(
  body: (
    ...params: Params
  ) => Promise<NoFetchKind<Result>> | NoFetchKind<Result>,
  key: string | ((...params: Params) => string),
  duration: Duration,
  { useFileCache = true, useAbsoluteDate = false }: Partial<CacheOptions> = {}
): ((...params: Params) => Promise<Fetched<Result>>) & {
  force: (...params: Params) => Promise<Fetched<Result>>;
} {
  const memCache = {} as Record<string, Fetched<Result>>;
  return Object.assign(
    async (...params: Params): Promise<Fetched<Result>> => {
      const currentKey = typeof key === 'function' ? key(...params) : key;
      if (memCache[currentKey]) {
        return memCache[currentKey];
      }
      const now = new Date();
      const cacheFile = join(ROOT, '.boj-cache', currentKey + '.json');
      const parsed = parse(cacheFile);
      if (await notExists(parsed.dir)) {
        await mkdirs(parsed.dir);
      }
      let fetchKind: FetchKind = 'fetch' as const;
      if (useFileCache && (await exists(cacheFile))) {
        const content = await readFile(cacheFile, { encoding: 'utf-8' });
        try {
          const { lastUpdate, data } = JSON.parse(content) as CacheData;
          const from = new Date(lastUpdate);
          const passed = Duration.fromDateRange(from, now);
          if (passed.compareTo(duration, useAbsoluteDate) < 0) {
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
      const fetched = Object.assign(await body.apply(null, params), {
        fetchKind,
      });
      memCache[currentKey] = fetched;
      if (useFileCache) {
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
      }
      return memCache[currentKey];
    },
    {
      force: async (...params: Params): Promise<Fetched<Result>> => {
        const currentKey = typeof key === 'function' ? key(...params) : key;
        const now = new Date();
        const cacheFile = join(ROOT, '.boj-cache', currentKey + '.json');
        const fetched = Object.assign(await body.apply(null, params), {
          fetchKind: 'force-fetch' as const,
        });
        memCache[currentKey] = fetched;
        if (useFileCache) {
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
        }
        return memCache[currentKey];
      },
    }
  );
}
