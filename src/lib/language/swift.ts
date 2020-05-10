import { Language } from '.';
import { LanguageId } from './id';
import { memory } from './util';

const SwiftLanguage: Language = {
  id: LanguageId.Swift,
  name: 'Swift',
  fileExtension: '.swift',
  color: '#ffac45',
  bojRuntimes: [
    {
      name: 'Swift',
      compileCommand: `swiftc Main.swift`,
      executeCommand: `./Main`,
      version: `Swift version 5.2.1 (swift-5.2.1-RELEASE)`,
      limitModifications: [memory({ add: 512 })],
    },
  ],
};

export default SwiftLanguage;
