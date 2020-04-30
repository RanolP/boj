"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const RubyLanguage = {
    id: id_1.LanguageId.Ruby,
    name: 'Ruby',
    fileExtension: '.rb',
    bojRuntimes: [
        {
            name: 'Ruby 2.7',
            compileCommand: `ruby -c Main.rb`,
            executeCommand: `ruby Main.rb`,
            version: `ruby 2.7.1p83 (2020-03-31 revision a0c7c23c9c) [x86_64-linux]`,
            limitModifications: [util_1.time({ add: 5 }), util_1.memory({ add: 512 })],
        },
    ],
};
exports.default = RubyLanguage;
