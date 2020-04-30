"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const TextLanguage = {
    id: id_1.LanguageId.Text,
    name: 'Text',
    fileExtension: '.txt',
    bojRuntimes: [
        {
            name: 'Text',
            compileCommand: `fromdos Main.txt`,
            executeCommand: `cat Main.txt`,
            version: `cat (GNU coreutils) 8.25`,
        },
    ],
};
exports.default = TextLanguage;
