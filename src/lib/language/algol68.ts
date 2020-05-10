import { Language } from '.';
import { LanguageId } from './id';

const Algol68Language: Language = {
  id: LanguageId.Algol68,
  name: 'Algol 68',
  fileExtension: '.a68',
  color: '#e2d2aa',
  bojRuntimes: [
    {
      name: 'Algol 68',
      compileCommand: 'a68g --check Main.a68',
      executeCommand: 'a68g Main.a68',
      version: 'Algol 68 Genie 2.8',
    },
  ],
};

export default Algol68Language;
