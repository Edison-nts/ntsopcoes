// @flow
import * as React from 'react';
import { SnackbarProvider as NotiSackProvider } from 'notistack';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const SnackbarProvider = (props) => {
  let snackbarProviderRef;
  const defaultProps = {
    children: undefined,
    autoHideDuration: 3000,
    maxSnack: 3,
    anchorOrigin: {
      horizontal: 'right',
      vertical: 'top',
    },
    ref: (el) => (snackbarProviderRef = el),
    action: (key) => (
      <IconButton color="inherit" style={{ fontSize: 20 }} onClick={() => snackbarProviderRef.closeSnackbar(key)}>
        <CloseIcon />
      </IconButton>
    ),
  };

  const newProps = { ...defaultProps, ...props };

  return <NotiSackProvider {...newProps}>{props.children}</NotiSackProvider>;
};
