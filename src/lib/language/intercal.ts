import { Language } from '.';
import { LanguageId } from './id';

const IntercalLanguage: Language = {
  id: LanguageId.Intercal,
  name: 'INTERCAL',
  fileExtension: '.i',
  color: '#aebeee',
  bojRuntimes: [
    {
      name: 'INTERCAL',
      executeCommand: 'ick Main.i',
      version: 'C-INTERCAL 0.29',
    },
  ],
};

export default IntercalLanguage;
