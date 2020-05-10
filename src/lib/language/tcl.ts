import { Language } from '.';
import { LanguageId } from './id';
import { memory } from './util';

const TclLanguage: Language = {
  id: LanguageId.Tcl,
  name: 'Tcl',
  fileExtension: '.tcl',
  color: '#e4cc98',
  bojRuntimes: [
    {
      name: 'Tcl',
      executeCommand: 'tclsh Main.tcl',
      version: '8.6',
      limitModifications: [memory({ add: 512 })],
    },
  ],
};

export default TclLanguage;
