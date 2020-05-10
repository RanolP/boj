"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const AheuiLanguage = {
    id: id_1.LanguageId.Aheui,
    name: '아희',
    fileExtension: '.aheui',
    color: '#aa00ff',
    bojRuntimes: [
        {
            name: '아희',
            executeCommand: 'rpaheui-c -O2 Main.aheui',
            version: 'rpaheui 1.2.2-24-gb66f488',
            limitModifications: [util_1.memory({ add: 32 })],
        },
    ],
};
exports.default = AheuiLanguage;
