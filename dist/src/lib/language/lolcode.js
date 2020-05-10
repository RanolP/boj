"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const LolCodeLanguage = {
    id: id_1.LanguageId.LolCode,
    name: 'LOLCODE',
    fileExtension: '.lol',
    color: '#cc9900',
    bojRuntimes: [
        {
            name: 'LOLCODE',
            executeCommand: 'lci Main.lol',
            version: 'lci v0.10.5',
        },
    ],
};
exports.default = LolCodeLanguage;
