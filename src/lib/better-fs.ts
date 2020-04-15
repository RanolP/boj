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
  rmdir as rmdirCallback,
  Stats,
} from 'fs';
import { promisify } from 'util';
import { resolve, parse, join } from 'path';

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
export const existsFile = async (
  path: PathLike,
  mode?: number
): Promise<boolean> =>
  (await exists(path, mode)) &&
  (await lstat(resolve(path.toString()))).isFile();
export const existsDirectory = async (
  path: PathLike,
  mode?: number
): Promise<boolean> =>
  (await exists(path, mode)) &&
  (await lstat(resolve(path.toString()))).isDirectory();
export const notExists = async (
  path: PathLike,
  mode?: number
): Promise<boolean> => !(await exists(path, mode));
export const notExistsFile = async (
  path: PathLike,
  mode?: number
): Promise<boolean> => !(await existsFile(path, mode));
export const notExistsDirectory = async (
  path: PathLike,
  mode?: number
): Promise<boolean> => !(await existsDirectory(path, mode));

export const unlink = promisify(unlinkCallback);
export const readlink = promisify(readlinkCallback);
export const readFile = promisify(readFileCallback);
export const writeFile = promisify(writeFileCallback);
export const mkdir = promisify(mkdirCallback);
export const rmdir = promisify(rmdirCallback);
export const mkdirs = async (dir: PathLike) => {
  const parsed = parse(dir.toString());
  if (await notExists(parsed.dir)) {
    await mkdirs(parsed.dir);
  }
  return mkdir(dir);
};
export const rimraf = async (
  path: PathLike,
  {
    file = () => true,
    folder = () => true,
  }: Partial<
    Record<'file' | 'folder', (path: string, stat: Stats) => boolean>
  > = {}
) => {
  const realPath = resolve(path.toString());
  if (await notExists(realPath)) {
    return;
  }
  const stat = await lstat(realPath);
  if (stat.isFile()) {
    if (file(realPath, stat)) {
      await unlink(realPath);
    }
    return;
  }
  if (!folder(realPath, stat)) {
    return;
  }
  for (const child of await readdir(realPath)) {
    await rimraf(join(realPath, child));
  }
  await rmdir(realPath);
};
