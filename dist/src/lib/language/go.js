"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const GoLanguage = {
    id: id_1.LanguageId.Go,
    name: 'Go',
    fileExtension: '.go',
    color: '#00ADD8',
    bojRuntimes: [
        Object.assign(Object.assign({ name: 'Go', compileCommand: `go build Main.go` }, util_1.NativeRun), { version: `go version go1.14.1 linux/amd64`, limitModifications: [util_1.time({ add: 2 }), util_1.memory({ add: 512 })] }),
    ],
};
exports.default = GoLanguage;
