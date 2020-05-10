"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const IntercalLanguage = {
    id: id_1.LanguageId.Intercal,
    name: 'INTERCAL',
    fileExtension: '.i',
    color: '#aebeee',
    bojRuntimes: [
        {
            name: 'INTERCAL',
            executeCommand: 'ick Main.i',
            version: 'C-INTERCAL 0.29',
        },
    ],
};
exports.default = IntercalLanguage;
