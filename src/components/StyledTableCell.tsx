import { styled, TableCell, TableCellProps, tableCellClasses } from '@mui/material';

export const StyledTableCell: React.ComponentType<TableCellProps> = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
