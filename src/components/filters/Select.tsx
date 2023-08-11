import React from 'react';
import { CellProps, SelectOptions } from '@joseaburt/react-table-manager';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Select, TableCell, MenuItem, SelectChangeEvent, Palette, Theme } from '@mui/material';

export type SelectCellProps = CellProps<string> & {
  options: SelectOptions[];
};

function Icon(props: any) {
  return <KeyboardArrowDownIcon {...props} sx={{ color: ({ palette }: Theme) => `${palette.text.secondary} !important` }} />;
}

export default function SelectFilter(props: CellProps<string>): JSX.Element {
  const { options } = props as SelectCellProps;

  const handleChange = (event: SelectChangeEvent<string>): void => {
    if (event.target.value === '__all__') props.onReset();
    else props.onChange(event.target.value as string);
  };

  return (
    <TableCell sx={{ padding: '2px 5px', borderBottom: ({ palette }) => `1px solid ${palette.divider}` }}>
      <Select
        fullWidth
        disableUnderline
        variant="standard"
        onChange={handleChange}
        IconComponent={Icon}
        value={props.value ?? '__all__'}
        inputProps={{
          MenuProps: {
            MenuListProps: {
              sx: {
                padding: 0,
                border: ({ palette }: Theme) => `1px solid ${palette.divider}`,
                backgroundColor: ({ palette }: Theme) => palette.background.paper,
              },
            },
          },
        }}
        sx={{
          '& .MuiSelect-select:focus': {
            background: 'transparent',
          },
        }}
      >
        <MenuItem value="__all__">all</MenuItem>
        {options.map((it: SelectOptions) => (
          <MenuItem key={it.value} value={it.value} children={it.label} />
        ))}
      </Select>
    </TableCell>
  );
}
