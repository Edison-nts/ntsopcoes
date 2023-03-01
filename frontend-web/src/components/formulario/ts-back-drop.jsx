// @flow
import { Backdrop, CircularProgress } from '@mui/material';
import { backdropCSS } from '../style';
import * as React from 'react';

const TsBackDrop = (props) => {
  return (
    <>
      <Backdrop sx={backdropCSS} open={props.processando}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default TsBackDrop;
