import { lstat, readdir, readFile } from './better-fs';
import { join, basename, parse } from 'path';
import { ROOT } from '../constants';
import { Duration } from '../cache';
import { loadJsonFile, writeJsonFileIfChanged } from '@idlebox/node-json-edit';

const PROBLEM_NUMBER_REGEX = /^[0-9]+$/;

let problems: Record<number, Problem> = {};
let fetchStatus = {
  allFetched: false,
  array: [] as Problem[],
  arraySorted: [] as Problem[],
};

type GetProblemListOption = Partial<{
  sorted: boolean;
}>;

export async function getProblemList({
  sorted = false,
}: GetProblemListOption = {}): Promise<Problem[]> {
  if (!fetchStatus.allFetched) {
    const fileList = await readdir(ROOT);
    for (const file of fileList) {
      const fetchedStat = await lstat(join(ROOT, file));
      if (fetchedStat.isFile()) {
        continue;
      }
      const folderBasename = basename(file);
      if (PROBLEM_NUMBER_REGEX.test(folderBasename)) {
        await getProblem(Number(folderBasename));
      }
    }
    fetchStatus.allFetched = true;
    fetchStatus.array = Object.values(problems);
    fetchStatus.arraySorted = Object.values(problems).sort((a, b) => {
      if (a.meta.solvedDate && b.meta.solvedDate) {
        const date = a.meta.createDate.localeCompare(b.meta.createDate);
        if (date !== 0) {
          return date;
        }
      }
      const date = (a.meta.solvedDate ?? a.meta.createDate).localeCompare(
        b.meta.solvedDate ?? b.meta.createDate,
      );
      if (date !== 0) {
        return date;
      }
      return a.meta.order - b.meta.order;
    });
  }
  return sorted ? fetchStatus.arraySorted : fetchStatus.array;
}

export async function getProblem(id: number): Promise<Problem | null> {
  try {
    const problem = new Problem(id);
    await problem.initialize();
    problems[id] = problem;
    return problem;
  } catch {
    return null;
  }
}

export interface ProblemMeta {
  createDate: string;
  solvedDate?: string;
  status: 'solved' | 'in-progress';
  order: number;
  type: 'daily-boj' | 'my-way';
}

export class Problem {
  private _meta: ProblemMeta | null = null;
  constructor(public readonly id: number) {}

  async initialize(): Promise<void> {
    this._meta = (await loadJsonFile(
      join(ROOT, this.id.toString(), 'meta.json'),
      'utf-8',
    )) as ProblemMeta;
  }

  async saveMeta(): Promise<void> {
    await writeJsonFileIfChanged(
      join(ROOT, this.id.toString(), 'meta.json'),
      this._meta,
      'utf-8',
    );
  }

  get isSolved(): boolean {
    return this.meta.status === 'solved';
  }

  get isTimeout(): boolean {
    const createDate = new Date(this.meta.createDate);
    const solvedDate = this.meta.solvedDate
      ? new Date(this.meta.solvedDate)
      : (() => {
          const now = new Date();
          const tomorrow = new Date(
            `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
          );
          tomorrow.setDate(tomorrow.getDate() + 1);
          return tomorrow;
        })();
    const duration = Duration.fromDateRange(createDate, solvedDate);

    return duration.compareTo(Duration.of({ day: 1 }), true) >= 0;
  }

  get noteFile(): string {
    return join(ROOT, this.id.toString(), 'Note.md');
  }

  async getSolutionList(): Promise<string[]> {
    const result = [];
    const fileList = await readdir(join(ROOT, this.id.toString()));
    for (const file of fileList) {
      const fetchedStat = await lstat(join(ROOT, this.id.toString(), file));
      if (fetchedStat.isDirectory()) {
        continue;
      }
      const filename = parse(file).name;
      if (filename !== 'solution') {
        continue;
      }
      result.push(file);
    }
    return result;
  }

  get meta(): ProblemMeta {
    return this._meta!;
  }
}
