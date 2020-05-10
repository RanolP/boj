import { Language } from '.';
import { LanguageId } from './id';
import { NativeRun, time, memory } from './util';

const SchemeLanguage: Language = {
  id: LanguageId.Scheme,
  name: 'Scheme',
  fileExtension: '.scm',
  color: '#1e4aec',
  bojRuntimes: [
    {
      name: 'Scheme',
      compileCommand: 'csc -output-file Main -O5 Main.scm',
      ...NativeRun,
      version: `Chicken Version 5.1.0 (rev 8e62f718)`,
      limitModifications: [
        time({ multiply: 2, add: 1 }),
        memory({ multiply: 2, add: 16 }),
      ],
    },
  ],
};

export default SchemeLanguage;
