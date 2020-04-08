import {
  lstat as lstatCallback,
  readdir as readdirCallback,
  symlink as symlinkCallback,
  access as accessCallback,
  unlink as unlinkCallback,
  readlink as readlinkCallback,
  PathLike,
  constants,
} from 'fs';
import { promisify } from 'util';
import { resolve } from 'path';

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
