import { Language } from '.';
import { LanguageId } from './id';
import { time, memory } from './util';

const ECMAScriptLanguage: Language = {
  id: LanguageId.ECMAScript,
  name: 'ECMAScript',
  fileExtension: '.js',
  color: '#f1e05a',
  bojRuntimes: [
    {
      name: 'node.js',
      executeCommand: `node Main.js`,
      version: `v12.16.1`,
      limitModifications: [
        time({ multiply: 3, add: 2 }),
        memory({ multiply: 2 }),
      ],
    },
    {
      name: 'Rhino',
      compileCommand: 'uglifyjs -o Main_uglify.js Main.js',
      executeCommand: 'java -Xms128m -Xmx512m -Xss64m -jar rhino.jar Main.js',
      version: 'Rhino 1.7.8',
      limitModifications: [
        time({ multiply: 2, add: 1 }),
        memory({ multiply: 2, add: 16 }),
      ],
    },
  ],
};

export default ECMAScriptLanguage;
