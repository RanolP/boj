"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const id_1 = require("./id");
const util_1 = require("./util");
const LuaLanguage = {
    id: id_1.LanguageId.Lua,
    name: 'Lua',
    fileExtension: '.lua',
    color: '#000080',
    bojRuntimes: [
        {
            name: 'Lua',
            compileCommand: `luac -p Main.lua`,
            executeCommand: `lua Main.lua`,
            version: `Lua 5.3.5 Copyright (C) 1994-2018 Lua.org, PUC-Rio`,
            limitModifications: [util_1.time({ add: 5 }), util_1.memory({ add: 512 })],
        },
    ],
};
exports.default = LuaLanguage;
