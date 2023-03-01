// @flow
import * as React from 'react';
import { TextField } from '@mui/material';

const textCSS = {
  margin: 1,
};

export const TsTextField = (props) => {
  const p = { ...props };
  p.fullWidth = props.fullWidth === undefined ? true : props.fullWidth;
  p.variant = props.variant || 'outlined';
  p.margin = props.margin || 'normal';

  return <TextField {...p} sx={textCSS} />;
};
