import React from 'react';
import { Typography, Stack, useTheme } from '@mui/material';
import { DarkNoDataSvg, LightNoDataSvg } from '../components/NoDataImage';

export type NoDataContainerProps = {
  placeholder: string;
  children?: React.ReactNode;
};

export default function createNoDataBodyContainer() {
  return function NoDataBodyContainer({ children, placeholder }: NoDataContainerProps): JSX.Element {
    const { palette } = useTheme();
    const PlaceHolderImage = palette.mode === 'dark' ? DarkNoDataSvg : LightNoDataSvg;
    return (
      <Stack direction="column" justifyContent="center" alignItems="center">
        {children ?? <img src={PlaceHolderImage as any} alt="no-data-in-table-img" />}
        <Typography variant="subtitle1" fontWeight={500} sx={{ textAlign: 'center', color: palette.mode === 'dark' ? '#51617d' : ({ palette }) => palette.grey[500] }}>
          {placeholder}
        </Typography>
      </Stack>
    );
  };
}
