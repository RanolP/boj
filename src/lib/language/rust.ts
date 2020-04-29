import { Language, LanguageId } from '.';
import { memory } from './util';

const RustLanguage: Language = {
  id: LanguageId.Rust,
  name: 'Rust',
  fileExtension: '.rs',
  bojRuntimes: [
    {
      name: 'Rust 2018',
      compileCommand: `rustc --edition 2018 -O -o Main Main.rs`,
      executeCommand: `./Main`,
      version: `rustc 1.42.0 (b8cedc004 2020-03-09)`,
      limitModifications: [memory({ add: 16 })],
    },
    {
      name: 'Rust',
      compileCommand: `rustc --edition 2015 -O -o Main Main.rs`,
      executeCommand: `./Main`,
      version: `rustc 1.42.0 (b8cedc004 2020-03-09)`,
      limitModifications: [memory({ add: 16 })],
    },
  ],
};

export default RustLanguage;
