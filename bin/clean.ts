import { rimraf } from '../src/better-fs';
import { chalk, Logger } from '../src/util/console';
import { ROOT } from '../src/constants';
import { join } from 'path';

(async () => {
  const base = new Logger('clean');
  const { success } = base.labeled({
    success: chalk.green,
  });
  await rimraf(join(ROOT, '.boj-cache'));
  success('Deleted .boj-cache/');
})();
