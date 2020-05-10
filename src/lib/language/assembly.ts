import { Language } from '.';
import { LanguageId } from './id';
import { NativeRun } from './util';

const AssemblyLanguage: Language = {
  id: LanguageId.Assembly,
  name: 'Assembly',
  fileExtension: '.asm',
  color: '#6E4C13',
  bojRuntimes: [
    {
      name: 'Assembly (32bit)',
      compileCommand: `nasm -f elf32 -o Main.o Main.asm && gcc -m32 -o Main Main.o`,
      ...NativeRun,
      version: `NASM version 2.14`,
    },
    {
      name: 'Assembly (64bit)',
      compileCommand: `nasm -f elf64 -o Main.o Main.asm && gcc -o Main Main.o`,
      ...NativeRun,
      version: `NASM version 2.14`,
    },
  ],
};

export default AssemblyLanguage;
