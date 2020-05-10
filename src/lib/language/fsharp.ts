import { Language } from '.';
import { LanguageId } from './id';
import { time, memory } from './util';

const FSharpLanguage: Language = {
  id: LanguageId.FSharp,
  name: 'F#',
  fileExtension: '.fs',
  color: '#b845fc',
  bojRuntimes: [
    {
      name: 'F#',
      compileCommand: `fsharpc Main.fs`,
      executeCommand: `mono --optimize=all Main.exe`,
      version: `Microsoft (R) F# Compiler version 10.2.3 for F# 4.5`,
      limitModifications: [time({ add: 5 }), memory({ add: 512 })],
    },
  ],
};

export default FSharpLanguage;
