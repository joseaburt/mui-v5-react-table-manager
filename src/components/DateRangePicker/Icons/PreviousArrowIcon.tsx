import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function PreviousArrowIcon({ sx, ...props }: SvgIconProps): JSX.Element {
  return (
    <SvgIcon width="24" height="24" viewBox="0 0 24 24" {...props} sx={{ ...sx, fill: 'none' }} xmlns="http://www.w3.org/2000/svg">
      <path d="M15.0018 19.9201L8.47875 13.4001C8.10894 13.028 7.90137 12.5247 7.90137 12.0001C7.90137 11.4755 8.10894 10.9722 8.47875 10.6001L15.0018 4.08008" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  );
}
