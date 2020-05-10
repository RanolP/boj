"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const SedLanguage = {
    id: id_1.LanguageId.sed,
    name: 'sed',
    fileExtension: '.sed',
    color: '#64b970',
    bojRuntimes: [
        {
            name: 'sed',
            compileCommand: 'fromdos Main.sed',
            executeCommand: 'sed -f Main.sed',
            version: 'sed (GNU sed) 4.7',
        },
    ],
};
exports.default = SedLanguage;
