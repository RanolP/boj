import { Language } from '.';
import { LanguageId } from './id';
import { memory } from './util';

const PerlLanguage: Language = {
  id: LanguageId.Perl,
  name: 'Perl',
  fileExtension: '.pl',
  color: '#0298c3',
  bojRuntimes: [
    {
      name: 'Perl',
      compileCommand: `perl -c Main.pl`,
      executeCommand: `perl Main.pl`,
      version: `Perl v5.30.0`,
      limitModifications: [memory({ add: 512 })],
    },
  ],
};

export default PerlLanguage;
