import { Language } from '.';
import { LanguageId } from './id';
import { time, memory } from './util';

const BooLanguage: Language = {
  id: LanguageId.Boo,
  name: 'Boo',
  fileExtension: '.boo',
  color: '#d4bec1',
  bojRuntimes: [
    {
      name: 'Boo',
      compileCommand: 'booc.exe Main.boo',
      // TODO: It may not work.
      executeCommand: './Main.exe',
      version: 'Boo Compiler version 0.9.4.9',
      limitModifications: [time({ add: 5 }), memory({ add: 512 })],
    },
  ],
};

export default BooLanguage;
