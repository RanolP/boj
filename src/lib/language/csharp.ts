import { Language } from '.';
import { LanguageId } from './id';
import { time, memory } from './util';

const CSharpLanguage: Language = {
  id: LanguageId.CSharp,
  name: 'C#',
  fileExtension: '.cs',
  color: '#178600',
  bojRuntimes: [
    {
      name: 'C# 6.0',
      compileCommand: `mcs -codepage:utf8 -warn:0 -optimize+ -checked+ -clscheck- -reference:System.Numerics.dll -out:Main.exe Main.cs`,
      executeCommand: `mono --optimize=all Main.exe`,
      version: `Mono C# compiler version 6.8.0.105`,
      limitModifications: [time({ add: 5 }), memory({ multiply: 2, add: 16 })],
    },
  ],
};

export default CSharpLanguage;
