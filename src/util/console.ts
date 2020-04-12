import { gray, underline } from './chalk';

export * as chalk from './chalk';

export type Styler = (...text: unknown[]) => string;
export type Print = (text: string) => void;
export type ColorablePrint = (style: Styler, text: string) => void;

export class Logger {
  constructor(private readonly group: string) {}

  log(text?: string): void {
    if (!text) {
      return;
    }
    console.log(gray(`[${this.group}] > `) + text);
  }

  labeled<T extends string | number>(
    input: Record<T, Styler> | Array<readonly [T, Styler]>,
    second?: Array<string | number> | number
  ): Record<T, Print>;

  labeled<T extends string | number>(
    input: Array<T>,
    second?: Array<string | number> | number,
    third?: Styler
  ): Record<T, ColorablePrint>;

  labeled<T extends string | number>(
    input: Array<T>,
    second: Styler
  ): Record<T, Print>;

  labeled<T extends string | number>(
    input: Record<T, Styler> | Array<readonly [T, Styler]> | Array<T>,
    second?: Array<string | number> | number | Styler,
    third?: Styler
  ): Record<T, Print | ColorablePrint> {
    if (Array.isArray(input)) {
      if (input.length === 0) {
        return {} as Record<T, Print | ColorablePrint>;
      }
      if (Array.isArray(input[0])) {
        return this.labeledColoredObject(
          Object.fromEntries(input as Array<[T, Styler]>) as Record<T, Styler>,
          second
        );
      } else {
        return this.labeledObject(input as T[], second || third);
      }
    }
    return this.labeledColoredObject(
      Array.isArray(input) && Array.isArray(input[0])
        ? (Object.fromEntries(input) as Record<T, Styler>)
        : input,
      second
    );
  }

  private labeledColoredObject<T extends string | number>(
    labels: Record<T, Styler>,
    second?: Array<string | number> | number | Styler
  ): Record<T, Print> {
    return Object.fromEntries(
      (Object.entries(
        this.labeledObject(
          Object.keys(labels) as T[],
          typeof second === 'function' ? second : undefined
        )
      ) as Array<[T, ColorablePrint]>).map<[T, Print]>(([label, colorable]) => [
        label,
        (text) => colorable(labels[label], text),
      ])
    ) as Record<T, Print>;
  }

  private labeledObject<T extends string | number>(
    labels: T[],
    second?: Array<string | number> | number | Styler
  ): Record<T, Print | ColorablePrint> {
    const maxLabelLength = (labels as Array<string | number>)
      .concat(second && Array.isArray(second) ? second : [])
      .map((it) => it.toString().length)
      .concat(typeof second !== 'number' ? [] : [second])
      .reduce((l, r) => Math.max(l, r), 0);
    return Object.fromEntries(
      labels.map<[T, ColorablePrint]>((label) => [
        label,
        (innerFirst: Styler | string, innerSecond?: string) => {
          let stylerToApply: Styler =
            (typeof innerFirst !== 'string' ? innerFirst : undefined) ||
            (typeof second === 'function' ? second : undefined) ||
            ((...param: unknown[]) => param.join(''));
          this.log(
            underline(stylerToApply ? stylerToApply(label) : label) +
              ' '.repeat(maxLabelLength - label.toString().length + 2) +
              (innerSecond ||
                (typeof innerFirst === 'string' ? innerFirst : undefined))
          );
        },
      ])
    ) as Record<T, ColorablePrint>;
  }
}