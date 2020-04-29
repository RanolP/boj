import { LimitModification } from '.';

export const NativeRun = {
  executeCommand: './Main',
};

export const limitModifier = <Unit extends string>(unit: Unit) => ({
  multiply = 1,
  add = 0,
}: Partial<Record<'multiply' | 'add', number>>): LimitModification<Unit> => {
  return {
    stringified: [multiply != 1 && `×${multiply}`, add !== 0 && `+${add}`, unit]
      .filter(Boolean)
      .join(''),
    evaluate: (base) => base * multiply + add,
  };
};

export const time = limitModifier('초');
export const memory = limitModifier('MB');
