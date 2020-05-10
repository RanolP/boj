"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const VBNetLanguage = {
    id: id_1.LanguageId.VBNet,
    name: 'VB.NET',
    fileExtension: '.vb',
    color: '#945db7',
    bojRuntimes: [
        {
            name: 'VB.NET 4.0',
            compileCommand: 'vbnc -out:Main.exe Main.vb',
            executeCommand: 'mono --optimize=all Main.exe',
            version: `Visual Basic.Net Compiler version 0.0.0.5943 (Mono 4.7 - tarball)`,
            limitModifications: [util_1.time({ add: 5 }), util_1.memory({ add: 512 })],
        },
    ],
};
exports.default = VBNetLanguage;
