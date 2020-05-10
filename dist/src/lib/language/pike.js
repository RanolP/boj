"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const PikeLanguage = {
    id: id_1.LanguageId.Pike,
    name: 'Pike',
    fileExtension: '.pike',
    color: '#005390',
    bojRuntimes: [
        {
            name: 'Pike',
            compileCommand: 'pike -e compile_file(\\"Main.pike\\");',
            executeCommand: 'pike Main.pike',
            version: 'Pike v7.8 release 866',
            limitModifications: [util_1.time({ add: 5 }), util_1.memory({ add: 512 })],
        },
    ],
};
exports.default = PikeLanguage;
