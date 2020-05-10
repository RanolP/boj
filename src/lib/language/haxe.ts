import { Language } from '.';
import { LanguageId } from './id';
import { time, memory } from './util';
const HaxeLanguage: Language = {
  id: LanguageId.Haxe,
  name: 'Haxe',
  fileExtension: '.hx',
  color: '#df7900',
  bojRuntimes: [
    {
      name: 'Haxe',
      compileCommand: 'haxe -main Main -python Main.py',
      executeCommand: 'python3 Main.py',
      version: 'Haxe 3.4.7',
      limitModifications: [
        time({ multiply: 3, add: 2 }),
        memory({ multiply: 2, add: 32 }),
      ],
    },
  ],
};

export default HaxeLanguage;
