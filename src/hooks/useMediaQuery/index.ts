import { useMediaQuery as useMQ, useTheme, Breakpoints } from '@mui/material';

export default function useMediaQuery(cb: (breakpoints: Breakpoints) => string): boolean {
  const theme = useTheme();
  return useMQ(cb(theme.breakpoints));
}
