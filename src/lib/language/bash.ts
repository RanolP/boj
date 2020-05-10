import { Language } from '.';
import { LanguageId } from './id';

const BashLanguage: Language = {
  id: LanguageId.Bash,
  name: 'Bash',
  fileExtension: '.sh',
  color: '#89e051',
  bojRuntimes: [
    {
      name: 'Bash',
      compileCommand: 'bash -n Main.sh',
      executeCommand: 'bash Main.sh',
      version: `GNU bash, version 5.0.0(1)-release (x86_64-pc-linux-gnu)`,
    },
  ],
};

export default BashLanguage;
