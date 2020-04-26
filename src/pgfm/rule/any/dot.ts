import { Rule, NoteContext } from '..';
import * as yup from 'yup';
import Viz from 'viz.js';
import { Module, render } from 'viz.js/full.render.js';
import { ROOT } from '../../../constants';
import { notExists, mkdirs, writeFile, rimraf } from '../../../lib/better-fs';
import { join } from 'path';
import { createHash } from 'crypto';

const viz = new Viz({ Module, render });

export const DotRule: Rule<string, NoteContext | {}> = {
  name: 'dot',
  type: 'any',
  isBlock: true,
  schema: yup.string().required(),
  initialize(context: NoteContext | {}): Promise<void> {
    const fragment =
      'problem' in context ? context.problem.id.toString() : 'readme';
    const dir = join(ROOT, 'boj-public', 'graphviz', 'dot', fragment);
    return rimraf(dir);
  },
  async execute(source: string, context: NoteContext | {}): Promise<string> {
    const fragment =
      'problem' in context ? context.problem.id.toString() : 'readme';
    const dir = join(ROOT, 'boj-public', 'graphviz', 'dot', fragment);
    if (await notExists(dir)) {
      await mkdirs(dir);
    }
    const graph = await viz.renderString(source, {
      engine: 'dot',
      format: 'svg',
    });
    const filename = createHash('md5').update(source).digest('hex') + '.svg';
    await writeFile(join(dir, filename), graph, { encoding: 'utf-8' });
    return `![dot graph](${
      'problem' in context ? '..' : '.'
    }/boj-public/graphviz/dot/${fragment}/${filename})`;
  },
};
