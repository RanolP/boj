import { Language } from '.';
import { LanguageId } from './id';
import { NativeRun } from './util';

const AdaLanguage: Language = {
  id: LanguageId.Ada,
  name: 'Ada',
  fileExtension: '.ada',
  color: '#02f88c',
  bojRuntimes: [
    {
      name: 'Ada',
      compileCommand: 'gnatmake -o Main Main.ada',
      ...NativeRun,
      version: `GNATMAKE 5.5.0`,
    },
  ],
};

export default AdaLanguage;
