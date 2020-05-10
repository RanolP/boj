import { Language } from '.';
import { LanguageId } from './id';
import { NativeRun } from './util';

const CobolLanguage: Language = {
  id: LanguageId.Cobol,
  name: 'Cobol',
  fileExtension: '.cob',
  color: '#0c238a',
  bojRuntimes: [
    {
      name: 'Cobol',
      compileCommand: 'cobc -x -O2 -o Main Main.cob',
      ...NativeRun,
      version: 'cobc (GnuCOBOL) 2.2.0',
    },
  ],
};

export default CobolLanguage;
