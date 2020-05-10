"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const CobraLanguage = {
    id: id_1.LanguageId.Cobra,
    name: 'Cobra',
    fileExtension: '.cobra',
    color: '#eb4b4b',
    bojRuntimes: [
        Object.assign(Object.assign({ name: 'Cobra', compileCommand: 'cobra -compile -o Main.cobra' }, util_1.NativeRun), { version: 'The Cobra Programming Language 0.9.2', limitModifications: [util_1.time({ add: 5 }), util_1.memory({ add: 512 })] }),
    ],
};
exports.default = CobraLanguage;
