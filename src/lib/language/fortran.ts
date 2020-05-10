import { Language } from '.';
import { LanguageId } from './id';
import { NativeRun, memory } from './util';

const FortranLanguage: Language = {
  id: LanguageId.Fortran,
  name: 'Fortran',
  fileExtension: '.f95',
  color: '#4d41b1',
  bojRuntimes: [
    {
      name: 'Fortran',
      compileCommand:
        'gfortran Main.f95 -o Main -O2 -Wall -fmax-array-constructor=2097152',
      ...NativeRun,
      version: `GNU Fortran (Ubuntu 5.5.0-12ubuntu1~16.04) 5.5.0 20171010`,
      limitModifications: [memory({ add: 16 })],
    },
  ],
};

export default FortranLanguage;
