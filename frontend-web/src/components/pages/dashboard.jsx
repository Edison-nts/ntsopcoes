/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import * as React from 'react';
import { Page } from './page';
import { getUser, setUser, usuarioNull } from '../util/auth';
import { Box, Tabs, Tab } from '@mui/material';
import authHttp from '../util/http/auth-http';
import { HOMEDIR } from '../util/auth';
import { formatISO, parseISO } from 'date-fns';
import { TsTextField } from '../formulario/ts-text-field';
import TsButton from '../formulario/ts-button';
import TsBackDrop from '../formulario/ts-back-drop';
import ShowError from '../formulario/show-error';
import PopMessage from '../formulario/pop-message';

const Dashboard = (props) => {

  const [popMessage, setPopMessage] = React.useState({ mensagem: undefined, tipo: undefined });
  const [errorLogin, setErrorLogin] = React.useState(false);
  const [msgLogin, setMsgLogin] = React.useState('');
  const [usuario, setUsuario] = React.useState('');
  const [atual, setAtual] = React.useState(usuarioNull);
  const [senha, setSenha] = React.useState('');
  const [permit, setPermit] = React.useState(0);
  const [processando, setProcessando] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(1);
  const [error, setError] = React.useState(undefined);
  const [url, setUrl] = React.useState('');

  const obterMinutosExpiracao = () => {
    if (atual.id === 0 || !atual.expires) return '0';

    const agora = new Date();
    const expires = parseISO(atual.expires);
    const delta = (expires.valueOf() - agora.valueOf()) / (1000 * 60);
    return delta.toFixed(0);
  };

  const efetuarLogin = async () => {
    setUrl('efetuarLogin');
    setProcessando(true);
    setError(undefined);
    localStorage.removeItem('projeto');

    try {
      const {data} = await authHttp.login(usuario, senha);
      const retUser = {
        id: data.id,
        usuarioPermit: data.usuarioPermit,
        authorization: data.authorization,
        login: data.login,
        role: data.role,
        token: data.token
      };

      const agora = new Date();
      agora.setMinutes(agora.getMinutes() + 100);
      retUser.expires = formatISO(agora);
      retUser.senha = senha;

      setUser(retUser);
      setUsuario('');
      setSenha('');
      setErrorLogin(false);
      setMsgLogin('Login com sucesso ...');

 
      setTimeout(() => {
        setProcessando(false);
        window.location.href = `${HOMEDIR}/`;
      }, 500);
    } catch (error) {
      setError(error);
      setUrl(authHttp.url);
      setProcessando(false);
      setUsuario('');
      setSenha('');
      setUser(usuarioNull);
      setErrorLogin(true);
      setMsgLogin('Erro ao efetuar login ...');
      setPopMessage({mensagem: 'Erro ao efetuar LOGIN', tipo: 'error'});
      setTimeout(() => {
        setAtual(getUser());
      }, 500);
    }
  };

  const handleTabPanel = (event, newValue) => {
    if (permit > 2) {
      setTabIndex(newValue);
    }
  };

  React.useEffect(() => {
    // console.log(' ... DashBoard sendo chamado');

    const usuario = getUser();
    if (usuario.id !== atual.id) {
      setAtual(usuario);
    }
  }, []);

  React.useEffect(() => {
    if (atual.id > 0) {
       

      const per = atual.usuarioPermit.find((up) => up.modulo === 'home');
      if (per) {
        setPermit(per.permit);
      } else {
        setPermit(0);
      }
    } else {
      setPermit(0);
    }
  }, [atual]);

  //

  return (
    <Page title="Dashboard">
      {atual.id > 0 && (
        <Box>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flex: '1 1 auto' }}>
              Logado como: {atual.login} , expira em {obterMinutosExpiracao()} Minutos
            </Box>
            <Box sx={{ flex: '0 0 auto' }}>
                Projeto
            </Box>
          </Box>
          {permit > 1 && (
            <Tabs value={tabIndex} onChange={handleTabPanel} aria-label="Opções da oferta">
              <Tab label="Transacoes" id="dash-tab-0" aria-labelledby={`dash-tabpanel-0`} />
              <Tab label="Log Autorizador" id="dash-tab-1" aria-labelledby={`dash-tabpanel-1`} />
              <Tab label="Graficos" id="dash-tab-2" aria-labelledby={`dash-tabpanel-2`} />
            </Tabs>
          )}
          {tabIndex === 0 && <div>Transacao</div>}
          {tabIndex === 1 && <div>View Logs</div>}
          {tabIndex === 2 && <div>Resumo</div>}
        </Box>
      )}
      {atual.id === 0 && (
        <React.Fragment>
          <form>
            <TsTextField
              label="Usuário"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              error={errorLogin}
              helperText={msgLogin}
            />
            <TsTextField label="Senha" value={senha} type="password" onChange={(e) => setSenha(e.target.value)} />
            <Box dir="rtl" paddingTop={4}>
              <TsButton onClick={(e) => efetuarLogin()}>Login</TsButton>
            </Box>
          </form>
          <TsBackDrop processando={processando} />
        </React.Fragment>
      )}
      {error !== undefined && <ShowError error={error} url={url} mensagemPadrao="Falha ao processar request" />}
      <PopMessage mensagem={popMessage.mensagem} tipo={popMessage.tipo} />
    </Page>
  );
};

export default Dashboard;
