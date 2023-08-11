import React from 'react';
import { ThemeOptions } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material';

const theme: ThemeOptions = {
  palette: {
    mode: 'light',
    background: {
      default: '#F8F9F9',
      paper: '#FFF',
    },
    primary: {
      light: '#42a5f5',
      main: '#1976d2',
      dark: '#1565c0',
    },
    divider: '#BFC5D2',
    grey: {
      50: '#fafafa',
      100: '#e7e9edae',
      200: '#E7E9ED',
      300: '#E7E9ED',
      400: '#9ba1b0af',
      500: '#797f8dd1',
      600: '#797F8D',
    },
  },
  typography: {
    fontSize: 13,
    fontWeightBold: 600,
    fontWeightLight: 300,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
    button: {
      textTransform: 'none',
    },
  },
};

export default function ThemeProvider({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <MUIThemeProvider theme={createTheme(theme)}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
