"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const AwkLanguage = {
    id: id_1.LanguageId.Awk,
    name: 'Awk',
    fileExtension: '.awk',
    color: '#cccccc',
    bojRuntimes: [
        {
            name: 'awk',
            compileCommand: 'gawk --source "BEGIN { exit(0) } END { exit(0) }" --file Main.awk',
            executeCommand: 'gawk --file Main.awk',
            version: `GNU Awk 4.2.1, API: 2.0`,
            limitModifications: [util_1.memory({ add: 16 })],
        },
    ],
};
exports.default = AwkLanguage;
