"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const OCamlLanguage = {
    id: id_1.LanguageId.OCaml,
    name: 'OCaml',
    fileExtension: '.ml',
    color: '#3be133',
    bojRuntimes: [
        Object.assign(Object.assign({ name: 'OCaml', compileCommand: 'ocamlc -o Main Main.ml' }, util_1.NativeRun), { version: `OCaml version 4.07.0`, limitModifications: [util_1.memory({ add: 32 })] }),
    ],
};
exports.default = OCamlLanguage;
