import { Language } from '.';
import { LanguageId } from './id';
import { time, memory } from './util';

const LuaLanguage: Language = {
  id: LanguageId.Lua,
  name: 'Lua',
  fileExtension: '.lua',
  color: '#000080',
  bojRuntimes: [
    {
      name: 'Lua',
      compileCommand: `luac -p Main.lua`,
      executeCommand: `lua Main.lua`,
      version: `Lua 5.3.5 Copyright (C) 1994-2018 Lua.org, PUC-Rio`,
      limitModifications: [time({ add: 5 }), memory({ add: 512 })],
    },
  ],
};

export default LuaLanguage;
