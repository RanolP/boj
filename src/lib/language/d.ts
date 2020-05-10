import { Language } from '.';
import { LanguageId } from './id';
import { NativeRun, memory } from './util';

const DLanguage: Language = {
  id: LanguageId.D,
  name: 'D',
  fileExtension: '.d',
  color: '#ba595e',
  bojRuntimes: [
    {
      name: 'D',
      compileCommand: `dmd -boundscheck=off -O -of=Main -fPIC -inline -release Main.d`,
      ...NativeRun,
      version: `DMD64 D Compiler v2.088.0`,
      limitModifications: [memory({ add: 16 })],
    },
  ],
};

export default DLanguage;
