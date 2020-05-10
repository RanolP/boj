"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const FSharpLanguage = {
    id: id_1.LanguageId.FSharp,
    name: 'F#',
    fileExtension: '.fs',
    color: '#b845fc',
    bojRuntimes: [
        {
            name: 'F#',
            compileCommand: `fsharpc Main.fs`,
            executeCommand: `mono --optimize=all Main.exe`,
            version: `Microsoft (R) F# Compiler version 10.2.3 for F# 4.5`,
            limitModifications: [util_1.time({ add: 5 }), util_1.memory({ add: 512 })],
        },
    ],
};
exports.default = FSharpLanguage;
