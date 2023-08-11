import React, { useState, useEffect } from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';
import { ColumnManager } from '@joseaburt/react-table-manager';

interface FilterHeaderProps<T> {
  configs: { [K in string]?: any };
  columnManager: ColumnManager<T>;
}

export default function createFilterHeader<T>(props: FilterHeaderProps<T>) {
  return function FilterHeader(): JSX.Element {
    const [showFilter, setShowFilter] = useState<boolean>(false);

    //if none of the columns are filterable we hide the filterHeader
    useEffect(() => {
      Object.keys(props.configs).forEach((key) => {
        const { isQueryable } = props.configs[key];
        if (isQueryable !== false) setShowFilter(true);
      });
    }, [props.configs]);

    return (
      <>
        {showFilter ? (
          <TableHead>
            <TableRow>
              {Object.keys(props.configs).map((key) => {
                const { Component, isQueryable, ...config } = props.configs[key];
                if (isQueryable === false)
                  return (
                    <TableCell
                      key={config.name}
                      sx={{
                        padding: '2px 5px',
                        borderBottom: ({ palette }) => `1px solid ${palette.divider}`,
                      }}
                    />
                  );
                if (!Component) return null;
                return <Component {...config} key={config.name} />;
              })}
            </TableRow>
          </TableHead>
        ) : (
          <></>
        )}
      </>
    );
  };
}
