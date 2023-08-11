import React from 'react';
import { Entity } from '../shared/types';
import createTableBody from './createTableBody';
import createPagination from './createPagination';
import createSortHeader from './createSortHeader';
import createFilterHeader from './createFilterHeader';
import { ITableManager } from '@joseaburt/react-table-manager';
import { Box, Card, CardProps, TableContainer, Table } from '@mui/material';

export type CreateTableOptions = {
  cardProps?: CardProps;
  customPagination?: JSX.Element;
  noDataPlaceholder?: JSX.Element;
  loadingPlaceholder?: JSX.Element;
  errorDataPlaceholder?: JSX.Element;
};

export function createTable<T extends Entity = Entity>(manager: ITableManager<T>, options?: CreateTableOptions) {
  const TableBody = createTableBody<T>(manager.getBodyCellComponentProps());
  const Pagination = createPagination(manager.getPaginationComponentProps());
  const LabelSortHeader = createSortHeader<T>({ columnManager: manager.columnManager, configs: manager.getHeaderSortComponentProps() });
  const FilterHeader = createFilterHeader<T>({ columnManager: manager.columnManager, configs: manager.getHeaderFilterComponentProps() });

  return function ComposedTable(): JSX.Element {
    return (
      <Card variant="outlined" {...options?.cardProps}>
        <TableContainer sx={{ overflowX: 'hidden' }}>
          <Table aria-label="simple table" className="TableMain">
            <LabelSortHeader />
            <FilterHeader />
            <TableBody />
          </Table>
        </TableContainer>
        <Box sx={{ borderTop: ({ palette }) => `1px solid ${palette.divider}` }}>
          <Pagination />
        </Box>
      </Card>
    );
  };
}
