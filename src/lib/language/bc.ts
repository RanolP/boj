import { Language } from '.';
import { LanguageId } from './id';

const BcLanguage: Language = {
  id: LanguageId.bc,
  name: 'bc',
  fileExtension: '.bc',
  color: '#2edd2e',
  bojRuntimes: [
    {
      name: 'bc',
      compileCommand: 'from Main.bc',
      executeCommand: 'bc -q Main.bc',
      version: 'bc 1.06.95',
    },
  ],
};

export default BcLanguage;
