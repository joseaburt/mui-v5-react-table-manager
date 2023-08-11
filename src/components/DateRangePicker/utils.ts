import moment from 'moment';
import { WeekDay } from './types';

export function ensureRange(val: any): string {
  if (val && 'format' in val) return val.format('l');
  return '';
}

export const weekLetters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function getMonthWeekFromDate(date: moment.Moment): number {
  const momentDate = moment(date);
  const monthWeek = momentDate.week() - momentDate.clone().startOf('month').week() + 1;
  return monthWeek;
}

export function getCurrentMonthDaysFromDate(date: moment.Moment): Record<number, WeekDay[]> {
  const startDate = date.clone().startOf('month');
  const endDate = startDate.clone().endOf('month');
  const weekDays: Record<number, WeekDay[]> = {};

  while (startDate.isSameOrBefore(endDate)) {
    const weekIndex = getMonthWeekFromDate(startDate.clone());
    if (!(weekIndex in weekDays)) weekDays[weekIndex] = [];
    const clone = startDate.clone();
    weekDays[weekIndex].push({ date: clone, belongToCurrentMonth: true, dateKey: clone.format('l') });
    startDate.add(1, 'day');
  }

  const firstWeek = weekDays[1];
  const lastMonthWeekIndex = Object.keys(weekDays)[Object.keys(weekDays).length - 1];
  const lastWeek: WeekDay[] = weekDays[lastMonthWeekIndex as unknown as number];

  if (firstWeek.length < 7) {
    let pendingDays = 7 - firstWeek.length;
    while (pendingDays > 0) {
      const { date } = firstWeek[0];
      const newDate = date.clone().subtract(1, 'day');
      weekDays[1].unshift({ date: newDate, belongToCurrentMonth: false, dateKey: newDate.format('l') });
      pendingDays--;
    }
  }

  if (lastWeek.length < 7) {
    let pendingDays = 7 - lastWeek.length;
    while (pendingDays > 0) {
      const { date } = lastWeek[lastWeek.length - 1];
      const newDate = date.clone().add(1, 'day');
      weekDays[lastMonthWeekIndex as unknown as number].push({ date: newDate, belongToCurrentMonth: false, dateKey: newDate.format('l') });
      pendingDays--;
    }
  }

  return weekDays;
}
