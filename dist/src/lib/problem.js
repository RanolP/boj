"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const better_fs_1 = require("./better-fs");
const path_1 = require("path");
const constants_1 = require("../constants");
const cache_1 = require("../cache");
const PROBLEM_NUMBER_REGEX = /^[0-9]+$/;
let problems = {};
let fetchStatus = {
    allFetched: false,
    array: [],
    arraySorted: [],
};
async function getProblemList({ sorted = false, } = {}) {
    if (!fetchStatus.allFetched) {
        const fileList = await better_fs_1.readdir(constants_1.ROOT);
        for (const file of fileList) {
            const fetchedStat = await better_fs_1.lstat(path_1.join(constants_1.ROOT, file));
            if (fetchedStat.isFile()) {
                continue;
            }
            const folderBasename = path_1.basename(file);
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
            const date = (a.meta.solvedDate || a.meta.createDate).localeCompare(b.meta.solvedDate || b.meta.createDate);
            if (date !== 0) {
                return date;
            }
            return a.meta.order - b.meta.order;
        });
    }
    return sorted ? fetchStatus.arraySorted : fetchStatus.array;
}
exports.getProblemList = getProblemList;
async function getProblem(id) {
    const problem = new Problem(id);
    await problem.initialize();
    problems[id] = problem;
    return problem;
}
exports.getProblem = getProblem;
class Problem {
    constructor(id) {
        this.id = id;
        this._meta = null;
    }
    async initialize() {
        this._meta = JSON.parse(await better_fs_1.readFile(path_1.join(constants_1.ROOT, this.id.toString(), 'meta.json'), {
            encoding: 'utf-8',
        }));
        return this._meta;
    }
    get isSolved() {
        return this.meta.status === 'solved';
    }
    get isTimeout() {
        const createDate = new Date(this.meta.createDate);
        const solvedDate = this.meta.solvedDate
            ? new Date(this.meta.solvedDate)
            : (() => {
                const now = new Date();
                const tomorrow = new Date(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`);
                tomorrow.setDate(tomorrow.getDate() + 1);
                return tomorrow;
            })();
        const duration = cache_1.Duration.fromDateRange(createDate, solvedDate);
        return duration.compareTo(cache_1.Duration.of({ day: 1 }), true) >= 0;
    }
    get noteFile() {
        return path_1.join(constants_1.ROOT, this.id.toString(), 'Note.md');
    }
    async getSolutionList() {
        const result = [];
        const fileList = await better_fs_1.readdir(path_1.join(constants_1.ROOT, this.id.toString()));
        for (const file of fileList) {
            const fetchedStat = await better_fs_1.lstat(path_1.join(constants_1.ROOT, this.id.toString(), file));
            if (fetchedStat.isDirectory()) {
                continue;
            }
            const filename = path_1.parse(file).name;
            if (filename !== 'solution') {
                continue;
            }
            result.push(file);
        }
        return result;
    }
    get meta() {
        return this._meta;
    }
}
exports.Problem = Problem;
