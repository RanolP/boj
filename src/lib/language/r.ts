import { Language } from '.';
import { LanguageId } from './id';
import { time, memory } from './util';

const RLanguage: Language = {
  id: LanguageId.R,
  name: 'R',
  fileExtension: '.R',
  color: '#198CE7',
  bojRuntimes: [
    {
      name: 'R',
      executeCommand: `Rscript Main.R`,
      version: `R scripting front-end version 3.6.1 (2019-07-05)`,
      limitModifications: [time({ add: 2 }), memory({ add: 128 })],
    },
  ],
};

export default RLanguage;
