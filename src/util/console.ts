import { gray, underline } from './chalk';
import stringWidth from 'string-width';

export * as chalk from './chalk';

export type Styler = (...text: unknown[]) => string;
export type Print = (text: string) => void;
export type ColorablePrint = ((style: Styler, text: string) => void) & {
  colored: (styler: Styler) => Print;
};

export class Logger {
  constructor(private readonly group: string) {}

  log(text?: string, begins?: string): void {
    if (!text) {
      console.log();
      return;
    }
    if (text.indexOf('\n') === 0) {
      console.log(gray(`[${this.group}] > `) + begins + text);
    } else {
      const lines = text.split('\n');
      console.log(gray(`[${this.group}] > `) + begins + lines[0]);

      for (const line of lines.slice(1)) {
        if (line.trim().length == 0) {
          console.log();
        } else {
          console.log(`      ${line}`);
        }
      }
    }
  }

  labeled<T extends string | number>(
    input: Record<T, Styler> | Array<readonly [T, Styler]>,
    second?: Array<string | number> | number,
  ): Record<T, Print>;

  labeled<T extends string | number>(
    input: Array<T>,
    second?: Array<string | number> | number,
    third?: Styler,
  ): Record<T, ColorablePrint>;

  labeled<T extends string | number>(
    input: Array<T>,
    second: Styler,
  ): Record<T, Print>;

  labeled<T extends string | number>(
    input: Record<T, Styler> | Array<readonly [T, Styler]> | Array<T>,
    second?: Array<string | number> | number | Styler,
    third?: Styler,
  ): Record<T, Print | ColorablePrint> {
    if (Array.isArray(input)) {
      if (input.length === 0) {
        return {} as Record<T, Print | ColorablePrint>;
      }
      if (Array.isArray(input[0])) {
        return this.labeledColoredObject(
          Object.fromEntries(input as Array<[T, Styler]>) as Record<T, Styler>,
          second,
        );
      } else {
        return this.labeledObject(input as T[], second ?? third);
      }
    }
    return this.labeledColoredObject(
      Array.isArray(input) && Array.isArray(input[0])
        ? (Object.fromEntries(input) as Record<T, Styler>)
        : input,
      second,
    );
  }

  private labeledColoredObject<T extends string | number>(
    labels: Record<T, Styler>,
    second?: Array<string | number> | number | Styler,
  ): Record<T, Print> {
    return Object.fromEntries(
      (Object.entries(
        this.labeledObject(
          Object.keys(labels) as T[],
          typeof second === 'function' ? second : undefined,
        ),
      ) as Array<[T, ColorablePrint]>).map<[T, Print]>(([label, colorable]) => [
        label,
        (text) => colorable(labels[label], text),
      ]),
    ) as Record<T, Print>;
  }

  private labeledObject<T extends string | number>(
    labels: T[],
    second?: Array<string | number> | number | Styler,
  ): Record<T, Print | ColorablePrint> {
    const maxLabelWidth = (labels as Array<string | number>)
      .concat(second && Array.isArray(second) ? second : [])
      .map((it) => stringWidth(it.toString()))
      .concat(typeof second !== 'number' ? [] : [second])
      .reduce((l, r) => Math.max(l, r), 0);
    return Object.fromEntries(
      labels.map((label: T): readonly [T, Print | ColorablePrint] => {
        const f = (innerFirst: Styler | string, innerSecond?: string) => {
          let stylerToApply: Styler =
            (typeof innerFirst !== 'string' ? innerFirst : undefined) ??
            (typeof second === 'function' ? second : undefined) ??
            ((...param: unknown[]) => param.join(''));
          this.log(
            innerSecond ??
              (typeof innerFirst === 'string' ? innerFirst : undefined),
            underline(stylerToApply ? stylerToApply(label) : label) +
              ' '.repeat(maxLabelWidth - stringWidth(label.toString()) + 2),
          );
        };
        return [
          label,
          Object.assign(f, {
            colored: (styler: Styler) => (text: string) => f(styler, text),
          }),
        ];
      }),
    ) as Record<T, Print | ColorablePrint>;
  }
}
