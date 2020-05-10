import { Language } from '.';
import { LanguageId } from './id';
import { NativeRun } from './util';

const PascalLanguage: Language = {
  id: LanguageId.Pascal,
  name: 'Pascal',
  fileExtension: '.pas',
  color: '#E3F171',
  bojRuntimes: [
    {
      name: 'Pascal',
      compileCommand: `fpc Main.pas -O2 -Co -Ct -Ci`,
      ...NativeRun,
      version: `Free Pascal Compiler version 3.0.0+dfsg-2 [2016/01/28] for x86_64`,
    },
  ],
};

export default PascalLanguage;
