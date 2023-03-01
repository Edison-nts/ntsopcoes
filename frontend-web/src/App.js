import React from 'react';
import { ThemeProvider } from '@mui/material';
import { Box, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { themeBase } from './theme';
import { SnackbarProvider } from './components/snackbar-provider';
import { Navbar } from './components/navbar';
import AppRouter from './components/routes/app-route';

import { HOMEDIR, getUser, usuarioNull } from './components/util/auth';

function App() {
  const [atual, setAtual] = React.useState(usuarioNull);

  const checkUser = () => {
    const usuario = getUser();

    if (usuario.id === 0 && usuario.id !== atual.id) {
      setAtual(usuario);
      window.location.href = `${HOMEDIR}/`;
    }

    if (usuario.id !== atual.id) {
      setAtual(usuario);
    }
  };

  React.useEffect(() => {
    const usuario = getUser();
    setAtual(usuario);
  }, []);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={themeBase}>
        <SnackbarProvider>
          <BrowserRouter>
            <Navbar atual={atual} checkUser={checkUser} />
            <Box paddingTop={'70px'}>
              <AppRouter />
            </Box>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
