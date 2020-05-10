"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const RLanguage = {
    id: id_1.LanguageId.R,
    name: 'R',
    fileExtension: '.R',
    color: '#198CE7',
    bojRuntimes: [
        {
            name: 'R',
            executeCommand: `Rscript Main.R`,
            version: `R scripting front-end version 3.6.1 (2019-07-05)`,
            limitModifications: [util_1.time({ add: 2 }), util_1.memory({ add: 128 })],
        },
    ],
};
exports.default = RLanguage;
