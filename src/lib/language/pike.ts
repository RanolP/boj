import { Language } from '.';
import { LanguageId } from './id';
import { time, memory } from './util';

const PikeLanguage: Language = {
  id: LanguageId.Pike,
  name: 'Pike',
  fileExtension: '.pike',
  color: '#005390',
  bojRuntimes: [
    {
      name: 'Pike',
      compileCommand: 'pike -e compile_file(\\"Main.pike\\");',
      executeCommand: 'pike Main.pike',
      version: 'Pike v7.8 release 866',
      limitModifications: [time({ add: 5 }), memory({ add: 512 })],
    },
  ],
};

export default PikeLanguage;
