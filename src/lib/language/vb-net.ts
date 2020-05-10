import { Language } from '.';
import { LanguageId } from './id';
import { time, memory } from './util';

const VBNetLanguage: Language = {
  id: LanguageId.VBNet,
  name: 'VB.NET',
  fileExtension: '.vb',
  color: '#945db7',
  bojRuntimes: [
    {
      name: 'VB.NET 4.0',
      compileCommand: 'vbnc -out:Main.exe Main.vb',
      executeCommand: 'mono --optimize=all Main.exe',
      version: `Visual Basic.Net Compiler version 0.0.0.5943 (Mono 4.7 - tarball)`,
      limitModifications: [time({ add: 5 }), memory({ add: 512 })],
    },
  ],
};

export default VBNetLanguage;
