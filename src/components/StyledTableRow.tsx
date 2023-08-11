import { styled, TableRow, TableRowProps, alpha } from '@mui/material';

export const StyledTableRow: React.ComponentType<TableRowProps> = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.background.default,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&.MuiTableRow-hover:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));
