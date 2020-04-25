export type StringNode = {
  type: 'string';
  data: string;
};
export type SyntaxNode = {
  type: 'pgfm-block' | 'pgfm-inline';
  name: string;
  origin: string;
  data?: object;
};
export type Node = StringNode | SyntaxNode;

export function createStringNode(data: string): StringNode {
  return {
    type: 'string' as const,
    data,
  };
}

export function createSyntaxNode(
  type: 'pgfm-block' | 'pgfm-inline',
  name: string,
  origin: string,
  data?: object,
): SyntaxNode {
  return {
    type,
    name,
    origin,
    data,
  };
}
