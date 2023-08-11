import moment from 'moment';

export type WeekDay = {
  dateKey: string;
  date: moment.Moment;
  belongToCurrentMonth: boolean;
};

export type Range = {
  start: moment.Moment | undefined;
  end: moment.Moment | undefined;
};

export type RangeWithTurn = Range & {
  turn: 'start' | 'end';
};

export type DateRangePickerProps = {
  value?: Range;
  onChange(range: { start: moment.Moment; end: moment.Moment }): void;
};
