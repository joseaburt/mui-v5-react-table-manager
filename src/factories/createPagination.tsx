import { useElementSize } from '../hooks';
import React, { useMemo, useState, useEffect } from 'react';
import { Box, Select, MenuItem, Typography } from '@mui/material';
import { PaginationProps, TableStatus, Pagination as PaginationState } from '@joseaburt/react-table-manager';

import Pagination from '@mui/material/Pagination';

export default function createPagination(props: PaginationProps) {
  return function MyPagination(): JSX.Element {
    const { ref, width } = useElementSize();
    const [status, setStatus] = useState<TableStatus>('LOADING');
    const [pagination, setPagination] = useState<PaginationState>({
      page: 0,
      total: 0,
      pages: 0,
      pageSize: 0,
    });

    useEffect(() => {
      const unsubscribe = props.onPaginationChangeSubscription((pagination) => setPagination(pagination));
      return () => unsubscribe();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const unsubscribe = props.onTableStatusChangeSubscription((status) => setStatus(status));
      return () => unsubscribe();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const options = useMemo(() => {
      const options = [10, 25, 50, 100];
      if (!options.includes(pagination.pageSize ?? 10)) {
        options.push(pagination.pageSize ?? 10);
      }
      return options.sort((a, b) => a - b);
    }, [pagination.pageSize]);

    const from = pagination.page === 1 ? 0 : pagination.page * pagination.pageSize;
    const to = pagination.page === 1 ? pagination.pageSize : pagination.page * pagination.pageSize + pagination.pageSize;

    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Select size="small" value={pagination.pageSize ?? 10} onChange={({ target }) => props.changePageSize(target.value as number)} sx={{ '.MuiSelect-select': { padding: '4px 14px' } }}>
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {width < 630 ? null : (
            <Typography sx={{ fontSize: '14px' }}>
              Showing {from === 0 ? 1 : from} to {to} of {pagination.total} entries
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {status === 'LOADING' ? 'Loading...' : null}

          <Pagination variant="outlined" page={pagination.page} count={pagination.pages} shape="rounded" onChange={(__, page) => props.changePage(page)} />
          <Typography sx={{ fontSize: '14px' }}>
            {pagination.page} of {pagination.pages}
          </Typography>
        </Box>
      </Box>
    );
  };
}
