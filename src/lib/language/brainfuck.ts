import { Language } from '.';
import { LanguageId } from './id';
import { NativeRun, time } from './util';

const BrainFuckLanguage: Language = {
  id: LanguageId.BrainFuck,
  name: 'Brainf**k',
  fileExtension: '.bf',
  color: '#2F2530',
  bojRuntimes: [
    {
      name: 'Brainf**k',
      compileCommand: [
        './bfi -c Main.bf',
        'gcc Main.c -o Main -O2 -Wall -lm -static -std=c11 -DONLINE_JUDGE -DBOJ',
      ],
      ...NativeRun,
      version: `bfi: Version 1.1.0 dabe513 on Linux x64`,
      limitModifications: [time({ add: 1 })],
    },
  ],
};

export default BrainFuckLanguage;
