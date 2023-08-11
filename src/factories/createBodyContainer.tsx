import React from 'react';
import { TableCell, TableRow, TableBody } from '@mui/material';

export default function createBodyContainer(content: React.ReactNode): JSX.Element {
  function BodyContainer(): JSX.Element {
    return (
      <TableBody sx={{ height: '10rem' }}>
        <TableRow sx={{ border: 'none' }}>
          <TableCell colSpan={777} sx={{ textAlign: 'center', border: 'none' }}>
            {content}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
  return <BodyContainer />;
}
