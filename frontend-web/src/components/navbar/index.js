import { Box } from '@mui/material';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { HOMEDIR, setUser, isAuthenticated, usuarioNull } from '../util/auth';
import { Menu } from './menu';
import { toolbarPainelCSS, toolbarProxyCSS, titleMenuCSS } from '../style';

export const Navbar = (props) => {
  const { atual } = props;
  const [mode, setMode] = React.useState('painel');
  const [changeMode, setChangeMode] = React.useState(false);

  const logout = () => {
    setUser(usuarioNull);
    props.checkUser();
    setTimeout(() => {
      window.location.href = `${HOMEDIR}/`;
    }, 500);
  };

  const flipMode = () => {
    let tempoMode = mode === 'proxy' ? 'painel' : 'proxy';
    localStorage.setItem('Painel_Mode', tempoMode);
    setMode(tempoMode);
    setChangeMode(true);
  };

  React.useEffect(() => {
    let tempoMode = localStorage.getItem('Painel_Mode') || 'painel';

    if (atual.id === 0 || (!atual.modePainel && !atual.modeProxy)) tempoMode = '';
    else {
      if (!atual.modePainel && tempoMode === 'painel') tempoMode = 'proxy';
      if (!atual.modeProxy && tempoMode === 'proxy') tempoMode = 'painel';
    }

    if (tempoMode) localStorage.setItem('Painel_Mode', tempoMode);

    setMode(tempoMode);
  }, [atual]);

  return (
    <div>
      <AppBar>
        <Toolbar sx={mode === 'proxy' ? toolbarProxyCSS : toolbarPainelCSS}>
          {isAuthenticated() && (
            <Box>
              <Menu mode={mode} atual={atual} checkUser={props.checkUser} changeMode={changeMode} />
              {atual.id > 0 && atual.modePainel && atual.modeProxy && (
                <Button color={'inherit'} onClick={() => flipMode()}>
                  ALTERNAR MODO
                </Button>
              )}
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
