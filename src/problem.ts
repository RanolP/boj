import { lstat, readdir, readFile } from './better-fs';
import { join, basename, parse } from 'path';
import { ROOT } from './constants';

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
        getProblem(Number(folderBasename));
      }
    }
    fetchStatus.allFetched = true;
    fetchStatus.array = Object.values(problems);
    fetchStatus.arraySorted = Object.values(problems).sort((a, b) => {
      const date = a.meta.date.localeCompare(b.meta.date);
      if (date !== 0) {
        return date;
      }
      return a.meta.order - b.meta.order;
    });
  }
  return sorted ? fetchStatus.arraySorted : fetchStatus.array;
}

export async function getProblem(id: number): Promise<Problem> {
  const problem = new Problem(id);
  await problem.initialize();
  problems[id] = problem;
  return problem;
}

interface ProblemMeta {
  date: string;
  lastUpdate: string;
  status: 'solved' | 'in-progress' | 'timeout' | 'solved-late';
  order: number;
  love?: number;
  problemDifficulty: 'A' | 'B' | 'C';
}

export class Problem {
  private _meta: ProblemMeta | null = null;
  constructor(public readonly id: number) {}

  async initialize() {
    this._meta = JSON.parse(
      await readFile(join(ROOT, this.id.toString(), 'meta.json'), {
        encoding: 'utf-8',
      })
    ) as ProblemMeta;
    return this._meta;
  }

  get isSolved(): boolean {
    switch (this.meta.status) {
      case 'solved':
      case 'solved-late':
        return true;
      default:
        return false;
    }
  }

  get noteFile(): string {
    return join(ROOT, this.id.toString(), 'Note.md');
  }

  async getSolutions(): Promise<string[]> {
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
