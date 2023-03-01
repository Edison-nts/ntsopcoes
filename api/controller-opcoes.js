const { Router } = require('express');
// const { verify, sign, decode, JwtPayload } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');

const opcoesRouter = Router();

opcoesRouter.post('/entrar', async (req, res, next) => {
  res.status(200).json({
    id: 1,
    login: 'egoncalez',
    name: 'Edison Goncalez',
    email: 'edison@nts.com.br',
    usuarioPermit: [
      { modulo: 'home', permit: 4 },
      { modulo: 'usuario', permit: 4 },
    ],
    authorization: 'Bear asdfasdfasdfasd',
    role: 'administrator',
    token: 'asdjfhlakdsfjhlsa',
  });
  return undefined;
});

/*
curl -X 'GET' \
  'http://localhost:5000/api/usuario/egoncalez' \
  -H 'accept: text/plain' \
  -H 'token: qerwqwerqwerqw'
*/

opcoesRouter.get('/usuario/:login_name', async (req, res, next) => {
  res.status(200).json({
    nsuHost: 0,
    codigoResposta: '00',
    mensagem: 'sucesso',
    usuario: {
      id: 1,
      login: 'egoncalez',
      name: 'Edison Goncalez',
      email: 'edison@nts.com.br',
      usuarioPermit: '',
      authorization: '',
      role: 'administrator',
    },
  });
  return undefined;
});

module.exports = opcoesRouter;
