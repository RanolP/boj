import { Language } from '.';
import { LanguageId } from './id';
import { NativeRun, memory } from './util';

const OCamlLanguage: Language = {
  id: LanguageId.OCaml,
  name: 'OCaml',
  fileExtension: '.ml',
  color: '#3be133',
  bojRuntimes: [
    {
      name: 'OCaml',
      compileCommand: 'ocamlc -o Main Main.ml',
      ...NativeRun,
      version: `OCaml version 4.07.0`,
      limitModifications: [memory({ add: 32 })],
    },
  ],
};

export default OCamlLanguage;
