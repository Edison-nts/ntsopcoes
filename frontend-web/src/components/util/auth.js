import { formatISO, parseISO } from 'date-fns';

export const TOKEN_KEY = '@ts-Token';

export const HOMEDIR = process.env.REACT_APP_HOMEDIR || '';

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  return true;
};

export const getToken = () => {
  const user = getUser();
  if (user && user.authorization) return user.authorization;
  else return '';
};

export const usuarioNull = {
  id: 0,
  usuarioPermit: [],
  modePainel: false,
  modeProxy: false,
};

const logTimeout = (mensagem) => {
  console.warn(`GETUSER - TIMEOUT: ${mensagem}`);
};

export const getUser_teste = () => {
  const expires = new Date().getDate() + 10000000;
  return {
    id: 999,
    login: 'TESTE',
    expires: expires.toString(),
    role: 'ADMIN',
    token: 'TESTE',
    authorization: 'TESTE',
    senha: 'TESTE',
    modePainel: true,
    modeProxy: true,
    usuarioPermit: [
      { modulo: 'admin', permit: 4 },
      { modulo: 'proxy', permit: 4 },
      { modulo: 'campanha', permit: 4 },
      { modulo: 'participante', permit: 4 },
      { modulo: 'home', permit: 4 },
      { modulo: 'simulador', permit: 4 },
    ],
  };
};

export const getUser = () => {
  const json = localStorage.getItem(TOKEN_KEY);
  if (json) {
    try {
      const user = JSON.parse(json);
      if (!user || !user.token || !user.expires) {
        logTimeout('objeto usuario invalido');
        localStorage.removeItem(TOKEN_KEY);
        return usuarioNull;
      }

      const agora = new Date();
      const expires = parseISO(user.expires);

      const delta = (expires.valueOf() - agora.valueOf()) / (1000 * 60);

      if (delta <= 1 || delta > 121) {
        logTimeout(`token expirou - delta: ${delta} - agora: ${formatISO(agora)} - expires: ${user.expires}`);
        localStorage.removeItem(TOKEN_KEY);
        return usuarioNull;
      }

      return user;
    } catch (error) {
      logTimeout('erro decoding json');
      localStorage.removeItem(TOKEN_KEY);
      return usuarioNull;
    }
  } else {
    //logTimeout("TOKEN INEXISTENTE EM localStorage");
    return usuarioNull;
  }
};

export const setUser = (usuario) => {
  if (usuario.token) localStorage.setItem(TOKEN_KEY, JSON.stringify(usuario));
  else localStorage.removeItem(TOKEN_KEY);
};

export const getProxy = () => {
  const prx = JSON.parse(localStorage.getItem('LISTA_PROXY'));
  const prxDefault = { nome: '** AUTORIZADOR **', url: process.env.REACT_APP_AUT_V4_URL || '', monitor: '', rede: '0007' };

  if (!prx || prx.length === 0) {
    return prxDefault;
  }

  let chave = localStorage.getItem('chaveProxy');

  if (!chave) {
    chave = prx[0].nome;
    localStorage.setItem('chaveProxy', chave);
  }

  let proxy = prx.find((p) => p.nome === chave);

  if (!proxy && prx.length > 0) {
    proxy = prx[0];
    chave = prx[0].nome;
    localStorage.setItem('chaveProxy', chave);
  }

  return proxy ?? prxDefault;
};
