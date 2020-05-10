"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const PHPLanguage = {
    id: id_1.LanguageId.PHP,
    name: 'PHP',
    fileExtension: '.php',
    color: '#4F5D95',
    bojRuntimes: [
        {
            name: 'PHP',
            compileCommand: `php -l Main.php`,
            executeCommand: `php Main.php`,
            version: `PHP 7.4.4`,
            limitModifications: [util_1.memory({ add: 512 })],
        },
    ],
};
exports.default = PHPLanguage;
