"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const HaxeLanguage = {
    id: id_1.LanguageId.Haxe,
    name: 'Haxe',
    fileExtension: '.hx',
    color: '#df7900',
    bojRuntimes: [
        {
            name: 'Haxe',
            compileCommand: 'haxe -main Main -python Main.py',
            executeCommand: 'python3 Main.py',
            version: 'Haxe 3.4.7',
            limitModifications: [
                util_1.time({ multiply: 3, add: 2 }),
                util_1.memory({ multiply: 2, add: 32 }),
            ],
        },
    ],
};
exports.default = HaxeLanguage;
