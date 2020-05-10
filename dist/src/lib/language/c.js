"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const gcc = (std) => (Object.assign(Object.assign({ compileCommand: `gcc Main.cc -o Main -O2 -Wall -lm -static -std=${std} -DONLINE_JUDGE -DBOJ` }, util_1.NativeRun), { version: `gcc (GCC) 8.3.0` }));
const clang = (std) => (Object.assign(Object.assign({ compileCommand: `clang Main.c -o Main -O2 -Wall -lm -static -std=${std} -DONLINE_JUDGE -DBOJ` }, util_1.NativeRun), { version: `clang version 9.0.1-+20191211110317+c1a0a213378-1~exp1~20191211221711.104` }));
const CLanguage = {
    id: id_1.LanguageId.C,
    name: 'C',
    fileExtension: '.c',
    color: '#555555',
    bojRuntimes: [
        Object.assign({ name: 'C11' }, gcc('c11')),
        Object.assign({ name: 'C' }, gcc('c99')),
        Object.assign({ name: 'C (Clang)' }, clang('c99')),
        Object.assign({ name: 'C11 (Clang)' }, clang('c11')),
    ],
};
exports.default = CLanguage;
