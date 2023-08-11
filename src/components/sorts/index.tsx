import React from 'react';
import AscIcon from '@mui/icons-material/North';
import DescIcon from '@mui/icons-material/South';
import { Box, TableCell, Typography, Theme } from '@mui/material';
import { SortCellProps } from '@joseaburt/react-table-manager';
import { get } from '../../utils';

const SortArrow = ({ direction }: { direction?: 'asc' | 'desc' }) => {
  return (
    <div style={{ position: 'relative', width: '24px', height: '24px', minHeight: '24px', minWidth: '24px' }}>
      <AscIcon
        sx={{
          left: 0,
          padding: 0,
          fontSize: '16px',
          position: 'absolute',
          transform: 'translateY(20%)',
          color: ({ palette }: Theme) => (direction === 'desc' || !direction ? palette.text.disabled : palette.text.primary),
        }}
      />
      <DescIcon
        sx={{
          right: 0,
          padding: 0,
          fontSize: '16px',
          position: 'absolute',
          transform: 'translateY(20%)',
          color: ({ palette }: Theme) => (direction === 'asc' || !direction ? palette.text.disabled : palette.text.primary),
        }}
      />
    </div>
  );
};

export const alignMap = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
  justify: 'space-between',
  inherit: 'inherit',
};
export default function Text(props: SortCellProps): JSX.Element {
  const inSortable = props.isSortable === false;

  const counter = React.useState(props.value === 'asc' ? 1 : props.value === 'desc' ? 2 : 0);
  const handleOnClick = () => {
    if (inSortable) return;
    counter[1]((pre) => {
      const newVal = pre + 1;
      if (newVal > 2) {
        props.onReset();
        return 0;
      }
      props.onChange(newVal === 1 ? 'asc' : 'desc');
      return newVal;
    });
  };

  return (
    <TableCell
      align="right"
      onClick={handleOnClick}
      padding="normal"
      sortDirection={props.value}
      sx={{
        width: props?.width ?? 'auto',
        padding: '10px 10px',
        cursor: inSortable ? 'default' : 'pointer',
        borderBottom: ({ palette }) => `1px solid ${palette.divider}`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: props.align ?? 'inherit', justifyContent: get(alignMap, props?.align ?? 'inherit', 'inherit') }}>
        <Typography variant="subtitle2" fontWeight={600} sx={{ whiteSpace: 'nowrap' }}>
          {props.label}
        </Typography>
        {inSortable ? null : <SortArrow direction={props.value} />}
      </Box>
    </TableCell>
  );
}
