"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const BashLanguage = {
    id: id_1.LanguageId.Bash,
    name: 'Bash',
    fileExtension: '.sh',
    color: '#89e051',
    bojRuntimes: [
        {
            name: 'Bash',
            compileCommand: 'bash -n Main.sh',
            executeCommand: 'bash Main.sh',
            version: `GNU bash, version 5.0.0(1)-release (x86_64-pc-linux-gnu)`,
        },
    ],
};
exports.default = BashLanguage;
