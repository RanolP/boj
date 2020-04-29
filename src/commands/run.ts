import { rimraf } from '../lib/better-fs';
import { chalk, Logger } from '../util/console';
import { ROOT } from '../constants';
import { join } from 'path';
import { Command } from '@oclif/command';

export default class RunCommand extends Command {
  public static description = 'Run ';

  async run() {
    const base = new Logger('clean');
    const { success } = base.labeled({
      success: chalk.green,
    });
    await rimraf(join(ROOT, '.boj-cache'));
    success('Deleted .boj-cache/');
  }
}
