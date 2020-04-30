"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const util_1 = require("util");
const path_1 = require("path");
exports.readdir = util_1.promisify(fs_1.readdir);
exports.lstat = util_1.promisify(fs_1.lstat);
exports.symlink = util_1.promisify(fs_1.symlink);
exports.access = util_1.promisify(fs_1.access);
exports.exists = async (path, mode) => {
    try {
        await exports.access(path_1.resolve(path.toString()), mode !== null && mode !== void 0 ? mode : fs_1.constants.F_OK);
        return true;
    }
    catch (error) {
        if (error && error.code === 'ENOENT') {
            return false;
        }
        else {
            throw error;
        }
    }
};
exports.existsFile = async (path, mode) => (await exports.exists(path, mode)) &&
    (await exports.lstat(path_1.resolve(path.toString()))).isFile();
exports.existsDirectory = async (path, mode) => (await exports.exists(path, mode)) &&
    (await exports.lstat(path_1.resolve(path.toString()))).isDirectory();
exports.notExists = async (path, mode) => !(await exports.exists(path, mode));
exports.notExistsFile = async (path, mode) => !(await exports.existsFile(path, mode));
exports.notExistsDirectory = async (path, mode) => !(await exports.existsDirectory(path, mode));
exports.unlink = util_1.promisify(fs_1.unlink);
exports.readlink = util_1.promisify(fs_1.readlink);
exports.readFile = util_1.promisify(fs_1.readFile);
exports.writeFile = util_1.promisify(fs_1.writeFile);
exports.mkdir = util_1.promisify(fs_1.mkdir);
exports.rmdir = util_1.promisify(fs_1.rmdir);
exports.mkdirs = async (dir) => {
    const parsed = path_1.parse(dir.toString());
    if (await exports.notExists(parsed.dir)) {
        await exports.mkdirs(parsed.dir);
    }
    return exports.mkdir(dir);
};
exports.rimraf = async (path, { file = () => true, folder = () => true, } = {}) => {
    const realPath = path_1.resolve(path.toString());
    if (await exports.notExists(realPath)) {
        return;
    }
    const stat = await exports.lstat(realPath);
    if (stat.isFile()) {
        if (file(realPath, stat)) {
            await exports.unlink(realPath);
        }
        return;
    }
    if (!folder(realPath, stat)) {
        return;
    }
    for (const child of await exports.readdir(realPath)) {
        await exports.rimraf(path_1.join(realPath, child));
    }
    await exports.rmdir(realPath);
};
exports.copyFile = util_1.promisify(fs_1.copyFile);
