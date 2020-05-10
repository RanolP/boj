import { Language } from '.';
import { LanguageId } from './id';
import { memory } from './util';

const AheuiLanguage: Language = {
  id: LanguageId.Aheui,
  name: '아희',
  fileExtension: '.aheui',
  color: '#aa00ff',
  bojRuntimes: [
    {
      name: '아희',
      executeCommand: 'rpaheui-c -O2 Main.aheui',
      version: 'rpaheui 1.2.2-24-gb66f488',
      limitModifications: [memory({ add: 32 })],
    },
  ],
};

export default AheuiLanguage;
