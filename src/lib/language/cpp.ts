import { Language, LanguageId } from '.';
import { NativeRun } from './util';

const gpp = (std: string) => ({
  compileCommand: `g++ Main.cc -o Main -O2 -Wall -lm -static -std=${std} -DONLINE_JUDGE -DBOJ`,
  ...NativeRun,
  version: `g++ (GCC) 8.3.0`,
});

const clangpp = (std: string) => ({
  compileCommand: `clang++ Main.cc -o Main -O2 -Wall -lm -static -std=${std} -DONLINE_JUDGE -DBOJ`,
  ...NativeRun,
  version: `clang version 9.0.1-+20191211110317+c1a0a213378-1~exp1~20191211221711.104`,
});

const CppLanguage: Language = {
  id: LanguageId.CPP,
  name: 'C++',
  fileExtension: '.cc',
  bojRuntimes: [
    { name: 'C++2a', ...gpp('gnu++2a') },
    { name: 'C++17', ...gpp('gnu++17') },
    { name: 'C++14', ...gpp('gnu++14') },
    { name: 'C++11', ...gpp('gnu++11') },
    { name: 'C++', ...gpp('gnu++98') },
    { name: 'C++ (Clang)', ...clangpp('c++98') },
    { name: 'C++11 (Clang)', ...clangpp('c++11') },
    { name: 'C++14 (Clang)', ...clangpp('c++14') },
    { name: 'C++17 (Clang)', ...clangpp('c++17') },
    { name: 'C++2a (Clang)', ...clangpp('c++2a') },
  ],
};

export default CppLanguage;
