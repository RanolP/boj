"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const duration_1 = require("./duration");
const constants_1 = require("../constants");
const path_1 = require("path");
const better_fs_1 = require("../lib/better-fs");
__export(require("./duration"));
function permastate(initial, key, duration, options = {}) {
    return [
        cached(initial, key, duration, options),
        cached((...[v]) => v, (...[_, ...params]) => key(...params), duration_1.Duration.of({})),
    ];
}
exports.permastate = permastate;
function cached(body, key, duration, { useFileCache = true, useAbsoluteDate = false } = {}) {
    const memCache = {};
    return Object.assign(async (...params) => {
        const currentKey = typeof key === 'function' ? key(...params) : key;
        if (memCache[currentKey]) {
            return memCache[currentKey];
        }
        const now = new Date();
        const cacheFile = path_1.join(constants_1.ROOT, '.boj-cache', currentKey + '.json');
        const parsed = path_1.parse(cacheFile);
        let fetchKind = 'fetch';
        if (useFileCache && (await better_fs_1.exists(cacheFile))) {
            const content = await better_fs_1.readFile(cacheFile, { encoding: 'utf-8' });
            try {
                const { lastUpdate, data } = JSON.parse(content);
                const from = new Date(lastUpdate);
                const passed = duration_1.Duration.fromDateRange(from, now);
                if (passed.compareTo(duration, useAbsoluteDate) < 0) {
                    const result = Object.assign(data, {
                        fetchKind: 'file',
                    });
                    memCache[currentKey] = result;
                    return result;
                }
            }
            catch (_a) {
                // do nothing
            }
            fetchKind = 'expired';
        }
        const fetched = Object.assign(await body.apply(null, params), {
            fetchKind,
        });
        memCache[currentKey] = fetched;
        if (useFileCache) {
            if (await better_fs_1.notExists(parsed.dir)) {
                await better_fs_1.mkdirs(parsed.dir);
            }
            await better_fs_1.writeFile(cacheFile, JSON.stringify({
                lastUpdate: now.toISOString(),
                data: fetched,
            }, null, '  '));
        }
        return memCache[currentKey];
    }, {
        force: async (...params) => {
            const currentKey = typeof key === 'function' ? key(...params) : key;
            const now = new Date();
            const cacheFile = path_1.join(constants_1.ROOT, '.boj-cache', currentKey + '.json');
            const parsed = path_1.parse(cacheFile);
            const fetched = Object.assign(await body.apply(null, params), {
                fetchKind: 'force-fetch',
            });
            memCache[currentKey] = fetched;
            if (useFileCache) {
                if (await better_fs_1.notExists(parsed.dir)) {
                    await better_fs_1.mkdirs(parsed.dir);
                }
                await better_fs_1.writeFile(cacheFile, JSON.stringify({
                    lastUpdate: now.toISOString(),
                    data: fetched,
                }, null, '  '));
            }
            return memCache[currentKey];
        },
    });
}
exports.cached = cached;
