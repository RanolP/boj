import updateNotifier from 'update-notifier';
import pkg from '../package.json';

updateNotifier({ pkg }).notify();

export { run } from '@oclif/command';
