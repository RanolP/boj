import { Language } from '.';
import { LanguageId } from './id';
import { NativeRun } from './util';

const ObjectiveCppLanguage: Language = {
  id: LanguageId.ObjectiveCpp,
  name: 'Objective-C++',
  fileExtension: '.mm',
  color: '#6866fb',
  bojRuntimes: [
    {
      name: 'Objective-C++',
      compileCommand:
        'g++ Main.mm -o Main `gnustep-config --objc-flags` `gnustep-config --base-libs` -O2 -DONLINE_JUDGE -DBOJ',
      ...NativeRun,
      version: `gcc (Ubuntu 5.5.0-12ubuntu1~16.04) 5.5.0 20171010`,
    },
  ],
};

export default ObjectiveCppLanguage;
