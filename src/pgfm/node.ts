export type Node =
  | {
      type: 'string';
      data: string;
    }
  | {
      type: 'pgfm-block' | 'pgfm-inline';
      name: string;
      origin: string;
      data?: object;
    };

export function createStringNode(data: string): Node {
  return {
    type: 'string' as const,
    data,
  };
}

export function createSyntaxNode(
  type: 'pgfm-block' | 'pgfm-inline',
  name: string,
  origin: string,
  data?: object
): Node {
  return {
    type,
    name,
    origin,
    data,
  };
}
