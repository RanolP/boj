import {
  lstat as lstatCallback,
  readdir as readdirCallback,
  symlink as symlinkCallback,
  access as accessCallback,
  unlink as unlinkCallback,
  readlink as readlinkCallback,
  PathLike,
  constants,
  readFile as readFileCallback,
  writeFile as writeFileCallback,
  mkdir as mkdirCallback,
} from 'fs';
import { promisify } from 'util';
import { resolve, parse } from 'path';

export const readdir = promisify(readdirCallback);
export const lstat = promisify(lstatCallback);
export const symlink = promisify(symlinkCallback);
export const access = promisify(accessCallback);
export const exists = async (
  path: PathLike,
  mode?: number
): Promise<boolean> => {
  try {
    await access(resolve(path.toString()), mode || constants.F_OK);
    return true;
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return false;
    } else {
      throw error;
    }
  }
};

export const unlink = promisify(unlinkCallback);
export const readlink = promisify(readlinkCallback);
export const readFile = promisify(readFileCallback);
export const writeFile = promisify(writeFileCallback);
export const mkdir = promisify(mkdirCallback);
export const mkdirs = async (dir: PathLike) => {
  const parsed = parse(dir.toString());
  if (!(await exists(parsed.dir))) {
    await mkdirs(parsed.dir);
  }
  return mkdir(dir);
};
