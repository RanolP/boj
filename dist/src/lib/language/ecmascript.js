"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const ECMAScriptLanguage = {
    id: id_1.LanguageId.ECMAScript,
    name: 'ECMAScript',
    fileExtension: '.js',
    color: '#f1e05a',
    bojRuntimes: [
        {
            name: 'node.js',
            executeCommand: `node Main.js`,
            version: `v12.16.1`,
            limitModifications: [
                util_1.time({ multiply: 3, add: 2 }),
                util_1.memory({ multiply: 2 }),
            ],
        },
        {
            name: 'Rhino',
            compileCommand: 'uglifyjs -o Main_uglify.js Main.js',
            executeCommand: 'java -Xms128m -Xmx512m -Xss64m -jar rhino.jar Main.js',
            version: 'Rhino 1.7.8',
            limitModifications: [
                util_1.time({ multiply: 2, add: 1 }),
                util_1.memory({ multiply: 2, add: 16 }),
            ],
        },
    ],
};
exports.default = ECMAScriptLanguage;
