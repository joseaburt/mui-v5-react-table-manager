import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, TableCell } from '@mui/material';
import { CellProps } from '@joseaburt/react-table-manager';

export default function Text(props: CellProps<string>): JSX.Element {
  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.value === '') props.onReset();
    else props.onChange(target.value);
  };

  return (
    <TableCell sx={{ padding: '2px 5px', borderBottom: ({ palette }) => `1px solid ${palette.divider}` }}>
      <InputBase startAdornment={<SearchIcon sx={{ color: 'grey.400', mr: 1, fontSize: '18px' }} />} type="text" name={props.name} placeholder={'Search'} sx={{ fontSize: '14px' }} value={props.value as string} onChange={handleOnChange} />
    </TableCell>
  );
}
