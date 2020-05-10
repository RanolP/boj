import { Language } from '.';
import { LanguageId } from './id';
import { time, memory } from './util';

const GolfScriptLanguage: Language = {
  id: LanguageId.GolfScript,
  name: 'GolfScript',
  fileExtension: '.gs',
  color: '#aaff44',
  bojRuntimes: [
    {
      name: 'Golfscript',
      executeCommand: `ruby golfscript.rb Main.gs`,
      version: `Golfscript (April 30, 2013)`,
      limitModifications: [time({ add: 2 }), memory({ add: 64 })],
    },
  ],
};

export default GolfScriptLanguage;
