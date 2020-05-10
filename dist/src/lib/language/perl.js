"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const PerlLanguage = {
    id: id_1.LanguageId.Perl,
    name: 'Perl',
    fileExtension: '.pl',
    color: '#0298c3',
    bojRuntimes: [
        {
            name: 'Perl',
            compileCommand: `perl -c Main.pl`,
            executeCommand: `perl Main.pl`,
            version: `Perl v5.30.0`,
            limitModifications: [util_1.memory({ add: 512 })],
        },
    ],
};
exports.default = PerlLanguage;
