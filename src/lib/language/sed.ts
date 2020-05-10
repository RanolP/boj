import { Language } from '.';
import { LanguageId } from './id';

const SedLanguage: Language = {
  id: LanguageId.sed,
  name: 'sed',
  fileExtension: '.sed',
  color: '#64b970',
  bojRuntimes: [
    {
      name: 'sed',
      compileCommand: 'fromdos Main.sed',
      executeCommand: 'sed -f Main.sed',
      version: 'sed (GNU sed) 4.7',
    },
  ],
};

export default SedLanguage;
