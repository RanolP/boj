"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const better_fs_1 = require("../lib/better-fs");
const console_1 = require("../util/console");
const constants_1 = require("../constants");
const path_1 = require("path");
const command_1 = require("@oclif/command");
class CleanCommand extends command_1.Command {
    async run() {
        const base = new console_1.Logger('clean');
        const { success } = base.labeled({
            success: console_1.chalk.green,
        });
        await better_fs_1.rimraf(path_1.join(constants_1.ROOT, '.boj-cache'));
        success('Deleted .boj-cache/');
    }
}
exports.default = CleanCommand;
CleanCommand.description = 'Clean .boj-cache folder';
