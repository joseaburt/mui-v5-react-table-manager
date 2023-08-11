import React from 'react';
import { TableHead, TableRow, darken } from '@mui/material';
import { ColumnManager } from '@joseaburt/react-table-manager';

interface SortHeaderProps<T> {
  configs: { [K in string]?: any };
  columnManager: ColumnManager<T>;
}

export default function createSortHeader<T>(props: SortHeaderProps<T>) {
  return function SortHeader(): JSX.Element {
    return (
      <TableHead>
        <TableRow
          sx={{
            width: '100%',
            backgroundColor: ({ palette }) => (palette.mode === 'dark' ? darken(palette.background.paper, 0.1) : palette.background.default),
          }}
        >
          {Object.keys(props.configs).map((key) => {
            const { Component, ...config } = props.configs[key];
            if (!Component) return null;
            return <Component {...config} key={config.name} />;
          })}
        </TableRow>
      </TableHead>
    );
  };
}
