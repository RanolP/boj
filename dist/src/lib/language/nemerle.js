"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const NemerleLanguage = {
    id: id_1.LanguageId.Nemerle,
    name: 'Nemerle',
    fileExtension: '.n',
    color: '#3d3c6e',
    bojRuntimes: [
        {
            name: 'Nemerle',
            compileCommand: 'ncc.exe -o Main -O Main.n',
            // TODO: It may not work.
            executeCommand: './Main.exe',
            version: 'Nemerle Compiler (ncc) version 1.2.0.539',
            limitModifications: [util_1.time({ add: 5 }), util_1.memory({ add: 512 })],
        },
    ],
};
exports.default = NemerleLanguage;
