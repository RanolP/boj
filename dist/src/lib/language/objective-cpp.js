"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const ObjectiveCppLanguage = {
    id: id_1.LanguageId.ObjectiveCpp,
    name: 'Objective-C++',
    fileExtension: '.mm',
    color: '#6866fb',
    bojRuntimes: [
        Object.assign(Object.assign({ name: 'Objective-C++', compileCommand: 'g++ Main.mm -o Main `gnustep-config --objc-flags` `gnustep-config --base-libs` -O2 -DONLINE_JUDGE -DBOJ' }, util_1.NativeRun), { version: `gcc (Ubuntu 5.5.0-12ubuntu1~16.04) 5.5.0 20171010` }),
    ],
};
exports.default = ObjectiveCppLanguage;
