import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function NextArrowIcon({ sx, ...props }: SvgIconProps): JSX.Element {
  return (
    <SvgIcon width="24" height="24" viewBox="0 0 24 24" {...props} sx={{ ...sx, fill: 'none' }} xmlns="http://www.w3.org/2000/svg">
      <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8.91016 19.9201L15.4302 13.4001C15.8 13.028 16.0075 12.5247 16.0075 12.0001C16.0075 11.4755 15.8 10.9722 15.4302 10.6001L8.91016 4.08008" />
    </SvgIcon>
  );
}
