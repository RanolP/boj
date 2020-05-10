"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const BrainFuckLanguage = {
    id: id_1.LanguageId.BrainFuck,
    name: 'Brainf**k',
    fileExtension: '.bf',
    color: '#2F2530',
    bojRuntimes: [
        Object.assign(Object.assign({ name: 'Brainf**k', compileCommand: [
                './bfi -c Main.bf',
                'gcc Main.c -o Main -O2 -Wall -lm -static -std=c11 -DONLINE_JUDGE -DBOJ',
            ] }, util_1.NativeRun), { version: `bfi: Version 1.1.0 dabe513 on Linux x64`, limitModifications: [util_1.time({ add: 1 })] }),
    ],
};
exports.default = BrainFuckLanguage;
