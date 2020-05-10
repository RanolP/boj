"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const gpp = (std) => (Object.assign(Object.assign({ compileCommand: `g++ Main.cc -o Main -O2 -Wall -lm -static -std=${std} -DONLINE_JUDGE -DBOJ` }, util_1.NativeRun), { version: `g++ (GCC) 8.3.0` }));
const clangpp = (std) => (Object.assign(Object.assign({ compileCommand: `clang++ Main.cc -o Main -O2 -Wall -lm -static -std=${std} -DONLINE_JUDGE -DBOJ` }, util_1.NativeRun), { version: `clang version 9.0.1-+20191211110317+c1a0a213378-1~exp1~20191211221711.104` }));
const CppLanguage = {
    id: id_1.LanguageId.CPP,
    name: 'C++',
    fileExtension: '.cc',
    color: '#f34b7d',
    bojRuntimes: [
        Object.assign({ name: 'C++2a' }, gpp('gnu++2a')),
        Object.assign({ name: 'C++17' }, gpp('gnu++17')),
        Object.assign({ name: 'C++14' }, gpp('gnu++14')),
        Object.assign({ name: 'C++11' }, gpp('gnu++11')),
        Object.assign({ name: 'C++' }, gpp('gnu++98')),
        Object.assign({ name: 'C++ (Clang)' }, clangpp('c++98')),
        Object.assign({ name: 'C++11 (Clang)' }, clangpp('c++11')),
        Object.assign({ name: 'C++14 (Clang)' }, clangpp('c++14')),
        Object.assign({ name: 'C++17 (Clang)' }, clangpp('c++17')),
        Object.assign({ name: 'C++2a (Clang)' }, clangpp('c++2a')),
    ],
};
exports.default = CppLanguage;
