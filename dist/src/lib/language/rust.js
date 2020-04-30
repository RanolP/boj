"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const RustLanguage = {
    id: id_1.LanguageId.Rust,
    name: 'Rust',
    fileExtension: '.rs',
    bojRuntimes: [
        {
            name: 'Rust 2018',
            compileCommand: `rustc --edition 2018 -O -o Main Main.rs`,
            executeCommand: `./Main`,
            version: `rustc 1.42.0 (b8cedc004 2020-03-09)`,
            limitModifications: [util_1.memory({ add: 16 })],
        },
        {
            name: 'Rust',
            compileCommand: `rustc --edition 2015 -O -o Main Main.rs`,
            executeCommand: `./Main`,
            version: `rustc 1.42.0 (b8cedc004 2020-03-09)`,
            limitModifications: [util_1.memory({ add: 16 })],
        },
    ],
};
exports.default = RustLanguage;
