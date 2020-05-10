import { Language } from '.';
import { LanguageId } from './id';

const WhitespaceLanguage: Language = {
  id: LanguageId.Whitespace,
  name: 'Whitespace',
  fileExtension: '.ws',
  color: 'transparent',
  bojRuntimes: [
    {
      name: 'Whitespace',
      executeCommand: 'whitespace Main.ws',
      version: 'Whitespace',
    },
  ],
};

export default WhitespaceLanguage;
