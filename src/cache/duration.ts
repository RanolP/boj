export enum DurationType {
  Second = 1,
  Minute = 2,
  Hour = 3,
  Day = 4,
  Month = 5,
  Year = 6,
}

export class DurationPart<T extends DurationType> {
  constructor(public readonly type: T, public readonly value: number) {}

  compare(other: DurationPart<T>): number {
    return this.value - other.value;
  }
}

export class Duration {
  constructor(
    public readonly year: DurationPart<DurationType.Year>,
    public readonly month: DurationPart<DurationType.Month>,
    public readonly day: DurationPart<DurationType.Day>,
    public readonly hour: DurationPart<DurationType.Hour>,
    public readonly minute: DurationPart<DurationType.Minute>,
    public readonly second: DurationPart<DurationType.Second>
  ) {}

  normalize(): Duration {
    let year = this.year.value;
    let month = this.month.value;
    let day = this.day.value;
    let hour = this.hour.value;
    let minute = this.minute.value;
    let second = this.second.value;
    while (second < 0) {
      minute -= 1;
      second += 60;
    }
    while (minute < 0) {
      hour -= 1;
      minute += 60;
    }
    while (hour < 0) {
      day -= 1;
      hour += 24;
    }
    while (day < 0) {
      month -= 1;
      day += 30;
    }
    while (month < 0) {
      year -= 1;
      month += 12;
    }
    return Duration.of({ year, month, day, hour, minute, second });
  }

  compareTo(other: Duration, useAbsoluteDate: boolean): number {
    const pick = <K extends keyof Duration>(key: K) => (
      d: Duration
    ): Duration[K] => (useAbsoluteDate ? d : d.normalize())[key];
    for (const picker of [
      pick('year'),
      pick('month'),
      pick('day'),
      pick('hour'),
      pick('minute'),
      pick('second'),
    ] as Array<(d: Duration) => DurationPart<any>>) {
      const compared = picker(this).compare(picker(other));
      if (compared !== 0) {
        return compared;
      }
    }
    return 0;
  }

  toString(): string {
    return `${this.year.value}-${this.month.value}-${this.day.value} ${this.hour.value}:${this.minute.value}:${this.second.value}`;
  }

  static of({
    year = 0,
    month = 0,
    day = 0,
    hour = 0,
    minute = 0,
    second = 0,
  }: Partial<
    Record<'year' | 'month' | 'day' | 'hour' | 'minute' | 'second', number>
  >): Duration {
    return new Duration(
      new DurationPart(DurationType.Year, year),
      new DurationPart(DurationType.Month, month),
      new DurationPart(DurationType.Day, day),
      new DurationPart(DurationType.Hour, hour),
      new DurationPart(DurationType.Minute, minute),
      new DurationPart(DurationType.Second, second)
    );
  }

  static fromDateRange(from: Date, to: Date): Duration {
    return new Duration(
      new DurationPart(
        DurationType.Year,
        to.getFullYear() - from.getFullYear()
      ),
      new DurationPart(DurationType.Month, to.getMonth() - from.getMonth()),
      new DurationPart(DurationType.Day, to.getDate() - from.getDate()),
      new DurationPart(DurationType.Hour, to.getHours() - from.getHours()),
      new DurationPart(
        DurationType.Minute,
        to.getMinutes() - from.getMinutes()
      ),
      new DurationPart(DurationType.Second, to.getSeconds() - from.getSeconds())
    );
  }
}
