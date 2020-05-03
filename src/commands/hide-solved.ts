import { notExists, exists, mkdirs } from '../lib/better-fs';
import { chalk, Logger } from '../util/console';
import { getProblemList, Problem } from '../lib/problem';
import { Command } from '@oclif/command';
import {
  writeJsonFileIfChanged,
  loadJsonFileIfExists,
} from '@idlebox/node-json-edit';

type TrieBase = {
  children: Record<string, TrieChild>;
};

interface TrieChild extends TrieBase {
  value: string;
  end: boolean;
}

type TrieRoot = TrieBase;

const MAGIC = '\0boj-managed\0';

export default class AnalyzeCommand extends Command {
  public static description =
    'Hide a problem which is not only solved but also had note (vscode only)';

  async run() {
    const base = new Logger('hide-solved');
    const { info, success } = base.labeled({
      info: chalk.blue,
      success: chalk.green,
    });

    const problemList = await getProblemList();
    const shouldHide = (
      await Promise.all(
        problemList.map(
          async (it): Promise<Problem[]> =>
            it.isSolved && (await exists(it.noteFile)) ? [it] : [],
        ),
      )
    ).flat();

    const trie: TrieRoot = { children: {} };
    for (const { id } of shouldHide) {
      let current = trie;
      [...id.toString()].forEach((c, i, a) => {
        if (!(c in current.children)) {
          current.children[c] = {
            value: c,
            children: {},
            end: i + 1 === a.length,
          };
        }
        current = current.children[c];
      });
    }

    if (await notExists('.vscode')) {
      await mkdirs('.vscode');
    }
    const file = await loadJsonFileIfExists(
      '.vscode/settings.json',
      {},
      'utf-8',
    );
    if (!('files.exclude' in file)) {
      file['files.exclude'] = {};
    }
    const exclude = file['files.exclude'];

    for (const key of Object.keys(exclude)) {
      if (key.startsWith(`{${MAGIC},`)) {
        delete exclude[key];
      }
    }

    for (const child of Object.values(trie.children)) {
      exclude[`{${MAGIC},${bakeGlob(child)}}`] = true;
    }

    exclude[`{${MAGIC},P*.*}`] = true;

    const result = await writeJsonFileIfChanged(
      '.vscode/settings.json',
      file,
      'utf-8',
    );

    if (result) {
      success(`Successfully hid ${shouldHide.length} problem(s).`);
      info(`Restart VS code to apply changes.`);
    } else {
      info(`Nothing updated. ${shouldHide.length} problem(s) hid.`);
    }
  }
}

function bakeGlob(
  trie: TrieChild | Array<TrieChild | undefined> | undefined,
): string {
  if (!trie) {
    return '';
  }
  if (Array.isArray(trie)) {
    if (trie.length === 1) {
      return bakeGlob(trie[0]);
    }
    return `{${trie.map(bakeGlob).join(',')}}`;
  }
  const children = Object.values(trie.children);
  if (children.length === 0) {
    return `${trie.value}/**/*`;
  }
  if (trie.end) {
    return `{${trie.value}/**/*,${trie.value}${bakeGlob(children)}}`;
  }
  return `${trie.value}${bakeGlob(children)}`;
}
