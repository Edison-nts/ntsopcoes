import { Box, Container, Typography } from '@mui/material';
import { mainTitleCSS } from '../style';
import * as React from 'react';

export const Page = (props) => {
  return (
    <Container>
      <Typography sx={mainTitleCSS}>{props.title}</Typography>
      <Box paddingTop={2}>{props.children}</Box>
    </Container>
  );
};
