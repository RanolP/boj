"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const TclLanguage = {
    id: id_1.LanguageId.Tcl,
    name: 'Tcl',
    fileExtension: '.tcl',
    color: '#e4cc98',
    bojRuntimes: [
        {
            name: 'Tcl',
            executeCommand: 'tclsh Main.tcl',
            version: '8.6',
            limitModifications: [util_1.memory({ add: 512 })],
        },
    ],
};
exports.default = TclLanguage;
