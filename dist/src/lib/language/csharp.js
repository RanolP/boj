"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const CSharpLanguage = {
    id: id_1.LanguageId.CSharp,
    name: 'C#',
    fileExtension: '.cs',
    color: '#178600',
    bojRuntimes: [
        {
            name: 'C# 6.0',
            compileCommand: `mcs -codepage:utf8 -warn:0 -optimize+ -checked+ -clscheck- -reference:System.Numerics.dll -out:Main.exe Main.cs`,
            executeCommand: `mono --optimize=all Main.exe`,
            version: `Mono C# compiler version 6.8.0.105`,
            limitModifications: [util_1.time({ add: 5 }), util_1.memory({ multiply: 2, add: 16 })],
        },
    ],
};
exports.default = CSharpLanguage;
