// @flow
import { Button } from '@mui/material'; // styled
import { buttonCSS } from '../style';
import * as React from 'react';

export const TsButton = (props) => {
  const p = { ...props };
  p.variant = props.variant || 'contained';
  p.color = props.color || 'primary';
  p.size = props.size || 'medium';

  return (
    <Button {...p} sx={buttonCSS}>
      {props.children}
    </Button>
  );
};

export default TsButton;
