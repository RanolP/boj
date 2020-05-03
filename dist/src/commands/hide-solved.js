"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const better_fs_1 = require("../lib/better-fs");
const console_1 = require("../util/console");
const problem_1 = require("../lib/problem");
const command_1 = require("@oclif/command");
const node_json_edit_1 = require("@idlebox/node-json-edit");
const MAGIC = '\0boj-managed\0';
class AnalyzeCommand extends command_1.Command {
    async run() {
        const base = new console_1.Logger('hide-solved');
        const { info, success } = base.labeled({
            info: console_1.chalk.blue,
            success: console_1.chalk.green,
        });
        const problemList = await problem_1.getProblemList();
        const shouldHide = (await Promise.all(problemList.map(async (it) => it.isSolved && (await better_fs_1.exists(it.noteFile)) ? [it] : []))).flat();
        const trie = { children: {} };
        for (const { id } of shouldHide) {
            let current = trie;
            [...id.toString()].forEach((c, i, a) => {
                if (!(c in current.children)) {
                    current.children[c] = {
                        value: c,
                        children: {},
                        end: i + 1 === a.length,
                    };
                }
                current = current.children[c];
            });
        }
        if (await better_fs_1.notExists('.vscode')) {
            await better_fs_1.mkdirs('.vscode');
        }
        const file = await node_json_edit_1.loadJsonFileIfExists('.vscode/settings.json', {}, 'utf-8');
        if (!('files.exclude' in file)) {
            file['files.exclude'] = {};
        }
        const exclude = file['files.exclude'];
        for (const key of Object.keys(exclude)) {
            if (key.startsWith(`{${MAGIC},`)) {
                delete exclude[key];
            }
        }
        for (const child of Object.values(trie.children)) {
            exclude[`{${MAGIC},${bakeGlob(child)}}`] = true;
        }
        exclude[`{${MAGIC},P*.*}`] = true;
        const result = await node_json_edit_1.writeJsonFileIfChanged('.vscode/settings.json', file, 'utf-8');
        if (result) {
            success(`Successfully hid ${shouldHide.length} problem(s).`);
            info(`Restart VS code to apply changes.`);
        }
        else {
            info(`Nothing updated. ${shouldHide.length} problem(s) hid.`);
        }
    }
}
exports.default = AnalyzeCommand;
AnalyzeCommand.description = 'Hide a problem which is not only solved but also had note (vscode only)';
function bakeGlob(trie) {
    if (!trie) {
        return '';
    }
    if (Array.isArray(trie)) {
        if (trie.length === 1) {
            return bakeGlob(trie[0]);
        }
        return `{${trie.map(bakeGlob).join(',')}}`;
    }
    const children = Object.values(trie.children);
    if (children.length === 0) {
        return `${trie.value}/**/*`;
    }
    if (trie.end) {
        return `{${trie.value}/**/*,${trie.value}${bakeGlob(children)}}`;
    }
    return `${trie.value}${bakeGlob(children)}`;
}
