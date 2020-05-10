"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const DLanguage = {
    id: id_1.LanguageId.D,
    name: 'D',
    fileExtension: '.d',
    color: '#ba595e',
    bojRuntimes: [
        Object.assign(Object.assign({ name: 'D', compileCommand: `dmd -boundscheck=off -O -of=Main -fPIC -inline -release Main.d` }, util_1.NativeRun), { version: `DMD64 D Compiler v2.088.0`, limitModifications: [util_1.memory({ add: 16 })] }),
    ],
};
exports.default = DLanguage;
