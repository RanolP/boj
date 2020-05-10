"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const BefungeLanguage = {
    id: id_1.LanguageId.Befunge,
    name: 'Befunge',
    fileExtension: '.befunge',
    color: '#efef22',
    bojRuntimes: [
        {
            name: 'Befunge',
            executeCommand: 'cfunge Main.befunge',
            version: 'cfunge 0.9.0',
            limitModifications: [util_1.memory({ add: 32 })],
        },
    ],
};
exports.default = BefungeLanguage;
