import { useState } from 'react';

export type AnchorAPI = {
  id: string | undefined;
  open: boolean;
  anchorEl: any;
  handleClose: () => void;
  handleClick: (event: any) => void;
};

export const useAnchor = (): AnchorAPI => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => setAnchorEl(null);
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);

  const open = Boolean(anchorEl);
  const id = open ? 'inlineselectPopover' : undefined;

  return {
    id,
    open,
    anchorEl,
    handleClick,
    handleClose,
  };
};
