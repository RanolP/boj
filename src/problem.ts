import { lstat, readdir } from './better-fs';
import { join, basename, parse } from 'path';
import { ROOT } from './constants';

const PROBLEM_NUMBER_REGEX = /^[0-9]+$/;

export async function getProblemList(): Promise<Problem[]> {
  const result = [];
  const fileList = await readdir(ROOT);
  for (const file of fileList) {
    const fetchedStat = await lstat(join(ROOT, file));
    if (fetchedStat.isFile()) {
      continue;
    }
    const folderBasename = basename(file);
    if (PROBLEM_NUMBER_REGEX.test(folderBasename)) {
      result.push(new Problem(Number(folderBasename)));
    }
  }
  return result;
}

export class Problem {
  constructor(public readonly id: number) {}

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
}
