"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const SchemeLanguage = {
    id: id_1.LanguageId.Scheme,
    name: 'Scheme',
    fileExtension: '.scm',
    color: '#1e4aec',
    bojRuntimes: [
        Object.assign(Object.assign({ name: 'Scheme', compileCommand: 'csc -output-file Main -O5 Main.scm' }, util_1.NativeRun), { version: `Chicken Version 5.1.0 (rev 8e62f718)`, limitModifications: [
                util_1.time({ multiply: 2, add: 1 }),
                util_1.memory({ multiply: 2, add: 16 }),
            ] }),
    ],
};
exports.default = SchemeLanguage;
