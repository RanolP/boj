import { Language } from '.';
import { LanguageId } from './id';
import { NativeRun } from './util';

const ObjectiveCLanguage: Language = {
  id: LanguageId.ObjectiveC,
  name: 'Objective-C',
  fileExtension: '.m',
  color: '#438eff',
  bojRuntimes: [
    {
      name: 'Objective-C',
      compileCommand:
        'gcc Main.m -o Main `gnustep-config --objc-flags` `gnustep-config --base-libs` -O2 -DONLINE_JUDGE -DB',
      ...NativeRun,
      version: `gcc (Ubuntu 5.5.0-12ubuntu1~16.04) 5.5.0 20171010`,
    },
  ],
};

export default ObjectiveCLanguage;
