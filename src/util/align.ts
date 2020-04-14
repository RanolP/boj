import stringWidth from 'string-width';

export type Stringifiable = string | number | boolean | null | undefined;

export type Align = 'left' | 'center' | 'right';

export function stringify<T extends Stringifiable>(s: T): string {
  if (s === null) {
    return 'null';
  }
  if (s === undefined) {
    return 'undefined';
  }
  return s.toString();
}

export function aligned<T>(
  array: T[],
  formatter: (value: T) => string,
  align: Align = 'left'
): string[] {
  const stringified = array.map((it) => {
    const s = formatter(it);
    return [s, stringWidth(s)] as const;
  });
  const maxWidth = Math.max(...stringified.map((it) => it[1]));

  return array.map((_, index) => {
    const [s, width] = stringified[index];
    const spaces = maxWidth - width;
    switch (align) {
      case 'left': {
        return s + ' '.repeat(spaces);
      }
      case 'center': {
        return (
          ' '.repeat(spaces % 2 == 0 ? spaces / 2 : (spaces - 1) / 2 + 1) +
          s +
          ' '.repeat(spaces % 2 == 0 ? spaces / 2 : (spaces - 1) / 2)
        );
      }
      case 'right': {
        return ' '.repeat(spaces) + s;
      }
    }
  });
}
