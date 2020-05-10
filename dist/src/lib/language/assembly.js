"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const AssemblyLanguage = {
    id: id_1.LanguageId.Assembly,
    name: 'Assembly',
    fileExtension: '.asm',
    color: '#6E4C13',
    bojRuntimes: [
        Object.assign(Object.assign({ name: 'Assembly (32bit)', compileCommand: `nasm -f elf32 -o Main.o Main.asm && gcc -m32 -o Main Main.o` }, util_1.NativeRun), { version: `NASM version 2.14` }),
        Object.assign(Object.assign({ name: 'Assembly (64bit)', compileCommand: `nasm -f elf64 -o Main.o Main.asm && gcc -o Main Main.o` }, util_1.NativeRun), { version: `NASM version 2.14` }),
    ],
};
exports.default = AssemblyLanguage;
