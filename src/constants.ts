import { relative } from 'path';
import { cwd } from 'process';

export const ROOT = relative(cwd(), '../');
