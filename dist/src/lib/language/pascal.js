"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const PascalLanguage = {
    id: id_1.LanguageId.Pascal,
    name: 'Pascal',
    fileExtension: '.pas',
    color: '#E3F171',
    bojRuntimes: [
        Object.assign(Object.assign({ name: 'Pascal', compileCommand: `fpc Main.pas -O2 -Co -Ct -Ci` }, util_1.NativeRun), { version: `Free Pascal Compiler version 3.0.0+dfsg-2 [2016/01/28] for x86_64` }),
    ],
};
exports.default = PascalLanguage;
