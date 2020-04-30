import { Language } from '.';
import { LanguageId } from './id';
import { time, memory } from './util';

const JavaLanguage: Language = {
  id: LanguageId.Java,
  name: 'Java',
  fileExtension: '.java',
  bojRuntimes: [
    {
      name: 'Java',
      compileCommand: `javac -J-Xms1024m -J-Xmx1024m -J-Xss512m -encoding UTF-8 Main.java`,
      executeCommand: `java -Xms1024m -Xmx1024m -Xss512m -Dfile.encoding=UTF-8 Main`,
      version: `Java(TM) SE Runtime Environment (build 1.8.0_201-b09)`,
      limitModifications: [
        time({ multiply: 2, add: 1 }),
        memory({ multiply: 2, add: 16 }),
      ],
    },
    {
      name: 'Java (OpenJDK)',
      compileCommand: `javac -J-Xms1024m -J-Xmx1024m -J-Xss512m -encoding UTF-8 Main.java`,
      executeCommand: `java -Xms1024m -Xmx1024m -Xss512m -Dfile.encoding=UTF-8 Main`,
      version: `OpenJDK Runtime Environment (build 1.8.0_242-8u242-b08-0ubuntu3~16.04-b08)`,
      limitModifications: [
        time({ multiply: 2, add: 1 }),
        memory({ multiply: 2, add: 16 }),
      ],
    },
    {
      name: 'Java 11',
      compileCommand: `javac -J-Xms1024m -J-Xmx1024m -J-Xss512m -encoding UTF-8 Main.java`,
      executeCommand: `java -Xms1024m -Xmx1024m -Xss512m -Dfile.encoding=UTF-8 Main`,
      version: `OpenJDK Runtime Environment (build 13+33)`,
      limitModifications: [
        time({ multiply: 2, add: 1 }),
        memory({ multiply: 2, add: 16 }),
      ],
    },
  ],
};

export default JavaLanguage;
