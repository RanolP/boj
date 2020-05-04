"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const SwiftLanguage = {
    id: id_1.LanguageId.Swift,
    name: 'Swift',
    fileExtension: '.swift',
    bojRuntimes: [
        {
            name: 'Swift',
            compileCommand: `swiftc Main.swift`,
            executeCommand: `./Main`,
            version: `Swift version 5.2.1 (swift-5.2.1-RELEASE)`,
            limitModifications: [util_1.memory({ add: 512 })],
        },
    ],
};
exports.default = SwiftLanguage;
