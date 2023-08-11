import 'react-app-polyfill/ie11';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { User } from './api/entities';
import UserRepository from './api/repository';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { RenderProps, TableManagerBuilder, ResponsiveTableViewsBuilder } from '../.';
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';

const manager = TableManagerBuilder.fromDataProvider<User>(new UserRepository())
  .addColumn({
    label: 'ID',
    name: 'id',
    type: 'text',
    width: '10%',
  })
  .addColumn({
    type: 'text',
    isSortable: true,
    isQueryable: true,
    label: 'Username',
    name: 'fullName',
    render({ value, record }: RenderProps<User>) {
      return (
        <Stack direction="row" alignItems="center" gap={1}>
          <Avatar sx={{ width: '2rem', height: '2rem' }} src={record.thumbnail} />
          <Box>
            <Typography>{record.fullName}</Typography>
            <Typography variant="caption" color="blue">
              {record.email}
            </Typography>
          </Box>
        </Stack>
      );
    },
  })
  .addColumn({
    label: 'Phone',
    name: 'phone',
    type: 'text',
  })
  .addColumn({
    label: 'Address',
    name: 'address',
    type: 'text',
  })
  .addColumn({
    label: 'Action',
    name: 'action',
    render({ value, record }: RenderProps<User>) {
      return (
        <Box>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
      );
    },
  })
  .get();

const TableResponsive = ResponsiveTableViewsBuilder.new<User>(manager)
  .addBreakpoint('(max-width: 636)', ['fullName'])
  .addBreakpoint('(max-width: 519)', ['action'])
  .addBreakpoint('(max-width: 690.390625)', ['id'])
  .addBreakpoint('(max-width: 900)', ['email', 'action'])
  .registerSmallView(<></>)
  .get({ debugWidth: true });

const App = () => {
  return <TableResponsive />;
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
