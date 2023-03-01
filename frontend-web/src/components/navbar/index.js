import { Box } from '@mui/material';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { HOMEDIR, setUser, isAuthenticated, usuarioNull } from '../util/auth';
import { Menu } from './menu';
import { toolbarPainelCSS, titleMenuCSS } from '../style';

export const Navbar = (props) => {
  const { atual } = props;

  const logout = () => {
    setUser(usuarioNull);
    props.checkUser();
    setTimeout(() => {
      window.location.href = `${HOMEDIR}/`;
    }, 500);
  };

  React.useEffect(() => {
    // console.log('Navbar - Atual', atual);
  }, [atual]);

  return (
    <div>
      <AppBar>
        <Toolbar sx={toolbarPainelCSS}>
          {isAuthenticated() && (
            <Box>
              <Menu atual={atual} checkUser={props.checkUser} />
            </Box>
          )}
          <Typography sx={titleMenuCSS}>
            NTS OPÇÕES
            {process.env.REACT_APP_VERSAO}
          </Typography>
          <Button color="inherit" onClick={() => logout()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
