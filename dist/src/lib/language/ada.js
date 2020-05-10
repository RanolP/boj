"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const AdaLanguage = {
    id: id_1.LanguageId.Ada,
    name: 'Ada',
    fileExtension: '.ada',
    color: '#02f88c',
    bojRuntimes: [
        Object.assign(Object.assign({ name: 'Ada', compileCommand: 'gnatmake -o Main Main.ada' }, util_1.NativeRun), { version: `GNATMAKE 5.5.0` }),
    ],
};
exports.default = AdaLanguage;
