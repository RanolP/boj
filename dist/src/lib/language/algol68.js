"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const Algol68Language = {
    id: id_1.LanguageId.Algol68,
    name: 'Algol 68',
    fileExtension: '.a68',
    color: '#e2d2aa',
    bojRuntimes: [
        {
            name: 'Algol 68',
            compileCommand: 'a68g --check Main.a68',
            executeCommand: 'a68g Main.a68',
            version: 'Algol 68 Genie 2.8',
        },
    ],
};
exports.default = Algol68Language;
