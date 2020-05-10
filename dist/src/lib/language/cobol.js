"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const CobolLanguage = {
    id: id_1.LanguageId.Cobol,
    name: 'Cobol',
    fileExtension: '.cob',
    color: '#0c238a',
    bojRuntimes: [
        Object.assign(Object.assign({ name: 'Cobol', compileCommand: 'cobc -x -O2 -o Main Main.cob' }, util_1.NativeRun), { version: 'cobc (GnuCOBOL) 2.2.0' }),
    ],
};
exports.default = CobolLanguage;
