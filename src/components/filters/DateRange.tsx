import React from 'react';
import moment from 'moment';
import { alignMap } from '../sorts';
import Popover from '@mui/material/Popover';
import { useAnchor } from '../../hooks/useAnchor';
import { CellProps } from '@joseaburt/react-table-manager';
import { TableCell, Typography, Box, Theme } from '@mui/material';
import { ClearInputAdornment } from './adornments/ClearInputAdornment';
import { DateRangePicker, Range } from '../../components/DateRangePicker';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { get } from '../../utils';

function parseValue(val: any): Range | undefined {
  let res: Range = { start: undefined, end: undefined };
  if (!val) return undefined;
  if ('lte' in val) res = { ...res, end: moment(val.lte) };
  if ('gte' in val) res = { ...res, start: moment(val.gte) };
  return res;
}

function getLabel(val: Range | undefined): string | null {
  if (!val) return null;
  let label = '';

  if (val.start) label += val.start.format('DD-MM');
  if (val.end) label += ' / ' + val.end.format('DD-MM');
  return label;
}

export default function DateRangeFilter(props: CellProps<string>): JSX.Element {
  const isValidDate = moment(props.value).isValid();
  const { handleClick, open, id, anchorEl, handleClose } = useAnchor();

  const range = parseValue(props.value);
  const label = getLabel(range);

  return (
    <TableCell sx={{ padding: '2px 5px', cursor: 'pointer', borderBottom: ({ palette }) => `1px solid ${palette.divider}` }} align={props.align ?? 'inherit'}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box
          component="button"
          sx={{
            width: '100%',
            border: 'none',
            display: 'flex',
            cursor: 'pointer',
            alignItems: 'center',
            background: 'transparent',
            textAlign: props.align ?? 'inherit',
            justifyContent: get(alignMap, props?.align ?? 'inherit', 'inherit'),
          }}
          onClick={handleClick}
        >
          <CalendarMonthRoundedIcon sx={{ color: ({ palette }: Theme) => (palette.mode === 'dark' ? 'grey.400' : 'grey.700'), mr: 1, fontSize: '20px' }} />
          <Typography sx={{ color: ({ palette }) => (palette.mode === 'dark' ? 'grey.400' : 'grey.700'), fontSize: '0.9rem', whiteSpace: 'nowrap' }} fontWeight="500">
            {label ? label : 'Select'}
          </Typography>
        </Box>
        <Popover
          id={id}
          open={open}
          elevation={0}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box
            sx={{
              borderRadius: '6px',
              border: ({ palette }) => `1px solid ${palette.divider}`,
            }}
          >
            <DateRangePicker
              value={range}
              onChange={({ start, end }) => {
                handleClose();
                props.onChange({ lte: end.endOf('day').toISOString(), gte: start.startOf('day').toISOString() } as any);
              }}
            />
          </Box>
        </Popover>
        {isValidDate && <ClearInputAdornment onClick={props.onReset} />}
      </Box>
    </TableCell>
  );
}
