import { Language } from '.';
import { LanguageId } from './id';
import { memory } from './util';

const BefungeLanguage: Language = {
  id: LanguageId.Befunge,
  name: 'Befunge',
  fileExtension: '.befunge',
  color: '#efef22',
  bojRuntimes: [
    {
      name: 'Befunge',
      executeCommand: 'cfunge Main.befunge',
      version: 'cfunge 0.9.0',
      limitModifications: [memory({ add: 32 })],
    },
  ],
};

export default BefungeLanguage;
