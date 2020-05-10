import { Language } from '.';
import { LanguageId } from './id';

const LolCodeLanguage: Language = {
  id: LanguageId.LolCode,
  name: 'LOLCODE',
  fileExtension: '.lol',
  color: '#cc9900',
  bojRuntimes: [
    {
      name: 'LOLCODE',
      executeCommand: 'lci Main.lol',
      version: 'lci v0.10.5',
    },
  ],
};

export default LolCodeLanguage;
