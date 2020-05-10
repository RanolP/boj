import { Language } from '.';
import { LanguageId } from './id';
import { time, memory } from './util';

const NemerleLanguage: Language = {
  id: LanguageId.Nemerle,
  name: 'Nemerle',
  fileExtension: '.n',
  color: '#3d3c6e',
  bojRuntimes: [
    {
      name: 'Nemerle',
      compileCommand: 'ncc.exe -o Main -O Main.n',
      // TODO: It may not work.
      executeCommand: './Main.exe',
      version: 'Nemerle Compiler (ncc) version 1.2.0.539',
      limitModifications: [time({ add: 5 }), memory({ add: 512 })],
    },
  ],
};

export default NemerleLanguage;
