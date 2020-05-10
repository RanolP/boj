export abstract class Chart<Data> {
  private _wholeData: Data[] = [];
  public add(data: Data) {
    this._wholeData.push(data);
  }

  /**
   * Get shallow-copied whole data the chart containing
   */
  public get wholeData(): Data[] {
    return [...this._wholeData];
  }

  /**
   * Render chart into SVG string.
   */
  abstract render(): string;
}

export * from './pie';
