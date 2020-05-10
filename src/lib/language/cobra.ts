import { Language } from '.';
import { LanguageId } from './id';
import { NativeRun, time, memory } from './util';

const CobraLanguage: Language = {
  id: LanguageId.Cobra,
  name: 'Cobra',
  fileExtension: '.cobra',
  color: '#eb4b4b',
  bojRuntimes: [
    {
      name: 'Cobra',
      compileCommand: 'cobra -compile -o Main.cobra',
      ...NativeRun,
      version: 'The Cobra Programming Language 0.9.2',
      limitModifications: [time({ add: 5 }), memory({ add: 512 })],
    },
  ],
};

export default CobraLanguage;
