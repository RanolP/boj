"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const BooLanguage = {
    id: id_1.LanguageId.Boo,
    name: 'Boo',
    fileExtension: '.boo',
    color: '#d4bec1',
    bojRuntimes: [
        {
            name: 'Boo',
            compileCommand: 'booc.exe Main.boo',
            // TODO: It may not work.
            executeCommand: './Main.exe',
            version: 'Boo Compiler version 0.9.4.9',
            limitModifications: [util_1.time({ add: 5 }), util_1.memory({ add: 512 })],
        },
    ],
};
exports.default = BooLanguage;
