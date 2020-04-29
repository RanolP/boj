import { Language, LanguageId } from '.';
import { NativeRun } from './util';

const gcc = (std: string) => ({
  compileCommand: `gcc Main.cc -o Main -O2 -Wall -lm -static -std=${std} -DONLINE_JUDGE -DBOJ`,
  ...NativeRun,
  version: `gcc (GCC) 8.3.0`,
});

const clang = (std: string) => ({
  compileCommand: `clang Main.c -o Main -O2 -Wall -lm -static -std=${std} -DONLINE_JUDGE -DBOJ`,
  ...NativeRun,
  version: `clang version 9.0.1-+20191211110317+c1a0a213378-1~exp1~20191211221711.104`,
});

export const CLanguage: Language = {
  id: LanguageId.C,
  name: 'C',
  fileExtension: '.c',
  bojRuntimes: [
    { name: 'C11', ...gcc('c11') },
    { name: 'C', ...gcc('c99') },
    { name: 'C (Clang)', ...clang('c99') },
    { name: 'C11 (Clang)', ...clang('c11') },
  ],
};

export default CLanguage;
