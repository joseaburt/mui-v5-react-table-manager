import moment from 'moment';
import React, { useState, useEffect } from 'react';
import NextArrowIcon from './Icons/NextArrowIcon';
import PreviousArrowIcon from './Icons/PreviousArrowIcon';
import { DateRangePickerProps, RangeWithTurn, WeekDay } from './types';
import { Stack, IconButton, Box, alpha, Typography } from '@mui/material';
import { ensureRange, getCurrentMonthDaysFromDate, weekLetters } from './utils';

const defaultRange = { end: undefined, start: undefined };

/**
 * ### Date Range Picker
 *
 * A Mui Prop picker, but without paying license 😉 🤟🏽🤟🏽🤟🏽
 * @author <pino0071@gmail.com> Jose Aburto
 */
export function DateRangePicker({ value, onChange }: DateRangePickerProps): JSX.Element {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [rangeSelection, setRangeSelection_] = useState<RangeWithTurn>({ ...(value ?? defaultRange), turn: 'start' });
  const [daysOfTheWeek, setDaysOfTheWeek] = useState<Record<number, WeekDay[]>>(getCurrentMonthDaysFromDate(moment()));

  useEffect(() => {
    setRangeSelection_((pre) => ({ ...pre, ...value }));
  }, [value]);

  const setRangeSelection = (handler: (range: RangeWithTurn) => RangeWithTurn) => {
    const res = handler(rangeSelection) as RangeWithTurn;
    if (typeof onChange === 'function' && res.start && res.end) onChange({ start: res.start.clone(), end: res.end.clone() });
    setRangeSelection_(res);
  };

  const nextMonth = () => {
    setCurrentMonth((pre) => {
      const newMonth = pre.clone().add(1, 'month');
      setDaysOfTheWeek(getCurrentMonthDaysFromDate(newMonth));
      return newMonth;
    });
  };

  const previousMonth = () => {
    setCurrentMonth((pre) => {
      const newMonth = pre.clone().subtract(1, 'month');
      setDaysOfTheWeek(getCurrentMonthDaysFromDate(newMonth));
      return newMonth;
    });
  };

  return (
    <Box sx={{ width: 'fit-content', padding: '0.8rem', borderRadius: '18px' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle2" fontSize="0.9rem" marginLeft="10px">
          {currentMonth.format('MMMM YYYY')}
        </Typography>
        <Stack direction="row">
          <IconButton sx={{ width: '2rem', height: '2rem' }} onClick={previousMonth}>
            <PreviousArrowIcon sx={{ fontSize: '1.2rem' }} />
          </IconButton>
          <IconButton sx={{ width: '2rem', height: '2rem' }} onClick={nextMonth}>
            <NextArrowIcon sx={{ fontSize: '1.2rem' }} />
          </IconButton>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" sx={{ width: 'fit-content', marginBottom: '2px' }}>
        {weekLetters.map((letter) => {
          return (
            <Box key={letter}>
              <IconButton disableRipple sx={{ fontSize: '0.8rem', width: '1.8rem', height: '1.8rem', color: ({ palette }) => palette.text.disabled }}>
                {letter}
              </IconButton>
            </Box>
          );
        })}
      </Stack>
      {Object.keys(daysOfTheWeek).map((index) => {
        const week: WeekDay[] = daysOfTheWeek[index as unknown as number];
        return (
          <Stack direction="row" alignItems="center" key={index} sx={{ width: 'fit-content', marginBottom: '2px' }}>
            {week.map(({ date, belongToCurrentMonth }: WeekDay, i: number) => {
              const id = date.format('l');
              const isOnRange = rangeSelection.start !== undefined && rangeSelection.end !== undefined;
              const isToday = id === moment().format('l');
              const isTodaySelected = ensureRange(rangeSelection.start) === id || ensureRange(rangeSelection.end) === id;
              const isBetween = isOnRange && date.isBetween(rangeSelection.start, rangeSelection.end);
              const isInitOfWeek = i === 0;
              const isEndOfWeek = i === week.length - 1;
              const rangeIsTheSame = ensureRange(rangeSelection.start) === ensureRange(rangeSelection.end);
              return (
                <Box
                  key={id}
                  sx={{
                    borderRadius: (isOnRange && ensureRange(rangeSelection.start) === id) || isInitOfWeek ? '18px 0px 0px 18px' : (isOnRange && ensureRange(rangeSelection.end) === id) || isEndOfWeek ? '0px 18px 18px 0px' : 'none',
                    background: ({ palette }) => (isOnRange && !rangeIsTheSame ? (isTodaySelected ? alpha(palette.primary.main, 0.1) : isBetween ? alpha(palette.primary.main, 0.1) : 'inherit') : 'none'),
                  }}
                >
                  <IconButton
                    disableRipple
                    onClick={() => {
                      if (rangeSelection.turn === 'start') {
                        if (!rangeSelection.start) return setRangeSelection((p) => ({ ...p, start: date, turn: 'end' }));
                        if (date.isAfter(rangeSelection.end)) return setRangeSelection((p) => ({ ...p, end: date, turn: 'start' }));
                        return setRangeSelection((p) => ({ ...p, start: date, turn: 'end' }));
                      }
                      if (!rangeSelection.end) return setRangeSelection((p) => ({ ...p, end: date, turn: 'start' }));
                      if (date.isBefore(rangeSelection.start)) return setRangeSelection((p) => ({ ...p, start: date, turn: 'end' }));
                      return setRangeSelection((p) => ({ ...p, end: date, turn: 'start' }));
                    }}
                    sx={{
                      '&:hover': {
                        border: ({ palette }) => (isBetween || isTodaySelected ? 'none' : `1px solid ${palette.divider}`),
                      },
                      width: '1.8rem',
                      height: '1.8rem',
                      fontSize: '0.8rem',
                      fontWeight: isToday ? 700 : 'inherit',
                      background: ({ palette }) => (isTodaySelected ? palette.primary.main : isBetween ? 'transparent' : 'inherit'),
                      color: ({ palette }) => (isTodaySelected ? palette.common.white : belongToCurrentMonth ? palette.text.primary : palette.text.disabled),
                    }}
                  >
                    {date.format('D')}
                  </IconButton>
                </Box>
              );
            })}
          </Stack>
        );
      })}
    </Box>
  );
}
