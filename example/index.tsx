import 'react-app-polyfill/ie11';
import ThemeProvider from './theme';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { User } from './api/entities';
import UserRepository from './api/repository';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { RenderProps, TableManagerBuilder, ResponsiveTableViewsBuilder } from '../.';
import { Avatar, Box, IconButton, Paper, Stack, Typography, alpha, darken } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import EditorPreview from './components/EditorPreview';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

let code = `

\`\`\`ts
// All the code needed ;-)

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
\`\`\`
`;

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
  .registerSmallView(<Box sx={{ padding: '4rem', textAlign: 'center' }}>Small Table Not Implemented</Box>)
  .get({ debugWidth: true });

const App = () => {
  return (
    <ThemeProvider>
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ position: 'fixed', width: '100vw', height: '40vh', background: ({ palette }) => darken(palette.primary.dark, 0.4), zIndex: -1 }} />
        <Header />
        <Box sx={{ padding: '2rem', position: 'relative', zIndex: 3 }}>
          <Paper elevation={4}>
            <TableResponsive />
          </Paper>
          <br />
          <EditorPreview children={code} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

function Header() {
  return (
    <Box sx={{ position: 'relative', zIndex: 3 }}>
      <Box sx={{ padding: '2rem 2rem 1rem 2rem', color: '#FFF', display: 'flex', justifyContent: 'space-between' }}>
        <Typography fontWeight={600} variant="h4">
          react-table-manager with Material v5 implementation
        </Typography>
        <IconButton>
          <GitHubIcon sx={{ color: '#FFF' }} />
        </IconButton>
      </Box>
      <Box sx={{ padding: '0rem 2rem 0rem 2rem' }}>
        <Typography sx={{ color: '#FFF' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta debitis suscipit rem, natus porro repellat recusandae saepe totam, hic cupiditate maxime nam deserunt qui amet error exercitationem nobis dignissimos reprehenderit.
        </Typography>
        <br />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 10px',
            width: 'fit-content',
            color: '#FFF',
            borderRadius: '10px',
            gap: 1,
            border: ({ palette }) => `1px solid ${palette.divider}`,
            background: ({ palette }) => alpha(palette.background.paper, 0.1),
          }}
        >
          <code>npm install @joseaburt/react-table-manager</code>{' '}
          <IconButton>
            <ContentCopyIcon sx={{ color: '#FFF', fontSize: '1rem' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
