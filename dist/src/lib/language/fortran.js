"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const FortranLanguage = {
    id: id_1.LanguageId.Fortran,
    name: 'Fortran',
    fileExtension: '.f95',
    color: '#4d41b1',
    bojRuntimes: [
        Object.assign(Object.assign({ name: 'Fortran', compileCommand: 'gfortran Main.f95 -o Main -O2 -Wall -fmax-array-constructor=2097152' }, util_1.NativeRun), { version: `GNU Fortran (Ubuntu 5.5.0-12ubuntu1~16.04) 5.5.0 20171010`, limitModifications: [util_1.memory({ add: 16 })] }),
    ],
};
exports.default = FortranLanguage;
