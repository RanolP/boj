import { Language } from '.';
import { LanguageId } from './id';
import { NativeRun, time, memory } from './util';

const GoLanguage: Language = {
  id: LanguageId.Go,
  name: 'Go',
  fileExtension: '.go',
  color: '#00ADD8',
  bojRuntimes: [
    {
      name: 'Go',
      compileCommand: `go build Main.go`,
      ...NativeRun,
      version: `go version go1.14.1 linux/amd64`,
      limitModifications: [time({ add: 2 }), memory({ add: 512 })],
    },
  ],
};

export default GoLanguage;
