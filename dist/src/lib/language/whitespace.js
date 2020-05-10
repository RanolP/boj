"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const WhitespaceLanguage = {
    id: id_1.LanguageId.Whitespace,
    name: 'Whitespace',
    fileExtension: '.ws',
    color: 'transparent',
    bojRuntimes: [
        {
            name: 'Whitespace',
            executeCommand: 'whitespace Main.ws',
            version: 'Whitespace',
        },
    ],
};
exports.default = WhitespaceLanguage;
