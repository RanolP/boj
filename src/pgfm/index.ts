import { WholeRules } from './rule';

const rule = /~~~([a-zA-Z\-_]+)\s+((?:~~?(?!~)|[^~]+)*)~~~/;

export type Node =
  | {
      type: 'string';
      data: string;
    }
  | {
      type: 'pgfm-block';
      name: string;
      data?: object;
      origin: string;
    };

export function parse(source: string): Node[] {
  const result = [] as Node[];
  while (source.length > 0) {
    const match = rule.exec(source);
    if (match === null) {
      result.push({
        type: 'string' as const,
        data: source,
      });
      break;
    }
    const before = source.substring(0, match.index);
    if (before.length > 0) {
      result.push({
        type: 'string' as const,
        data: before,
      });
    }
    try {
      result.push({
        type: 'pgfm-block',
        name: match[1],
        data: match[2] && JSON.parse(match[2]),
        origin: match.input,
      });
    } catch {
      result.push({
        type: 'string' as const,
        data: match.input,
      });
    }
    source = source.substring(match.index + match[0].length);
  }
  return result;
}

export async function preprocess(source: string): Promise<string> {
  const result = [];
  for (const node of parse(source)) {
    switch (node.type) {
      case 'string': {
        result.push(node.data);
        break;
      }
      case 'pgfm-block': {
        const rule = WholeRules[node.name];
        result.push(
          '\n\n' + rule ? await rule.execute(node.data) : node.origin + '\n\n'
        );
        break;
      }
    }
  }
  return result.join('');
}
