"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const BcLanguage = {
    id: id_1.LanguageId.bc,
    name: 'bc',
    fileExtension: '.bc',
    color: '#2edd2e',
    bojRuntimes: [
        {
            name: 'bc',
            compileCommand: 'from Main.bc',
            executeCommand: 'bc -q Main.bc',
            version: 'bc 1.06.95',
        },
    ],
};
exports.default = BcLanguage;
