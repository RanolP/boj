"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const GolfScriptLanguage = {
    id: id_1.LanguageId.GolfScript,
    name: 'GolfScript',
    fileExtension: '.gs',
    color: '#aaff44',
    bojRuntimes: [
        {
            name: 'Golfscript',
            executeCommand: `ruby golfscript.rb Main.gs`,
            version: `Golfscript (April 30, 2013)`,
            limitModifications: [util_1.time({ add: 2 }), util_1.memory({ add: 64 })],
        },
    ],
};
exports.default = GolfScriptLanguage;
