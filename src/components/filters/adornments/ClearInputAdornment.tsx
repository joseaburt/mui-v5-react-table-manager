import React from 'react';
import { InputAdornment } from '@mui/material';
import { IconButton, Theme } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const ClearInputAdornment = ({ onClick }: { onClick: () => void }) => (
  <InputAdornment position="end">
    <IconButton sx={{ height: '22px', width: '22px' }} onClick={onClick}>
      <CloseRoundedIcon sx={{ color: ({ palette }: Theme) => (palette.mode === 'dark' ? 'grey.400' : 'grey.700'), fontSize: '18px' }} />
    </IconButton>
  </InputAdornment>
);
