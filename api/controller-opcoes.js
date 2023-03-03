const { Router } = require('express');
// const { verify, sign, decode, JwtPayload } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
// const opLabHttp = require('./http-oplab');
const Movimento = require('./rep-movimentos');

const opcoesRouter = Router();

opcoesRouter.post('/entrar', async (req, res, next) => {
  try {
    const { login, senha } = req.body;

    if (!login || !senha) {
      res.status(401).json({ sucesso: false, mensagem: 'paramentros invalidos' });
      return undefined;
    }

    const movimento = new Movimento();

    const usuario = await movimento.getUsuario(login);

    if (!usuario || usuario.username.toUpperCase() !== login.toUpperCase() || usuario.password !== senha) {
      res.status(401).json({ sucesso: false, mensagem: 'usuario ou senha invalidos' });
      return undefined;
    }

    const versao = await movimento.getVersao();
    const delta = new Date().getTime() - versao.timestamp;

    // cinco minutos
    if (delta < 5 * 60 * 1000) {
      console.log('Ativos atualizados');
    } else {
      console.log('Atualizando base de ativos');
      await movimento.atualizarAcao('PETR4');
      await movimento.atualizarAcao('BOVA11');

      await movimento.atualizarOpcoes('PETR4');
      await movimento.atualizarOpcoes('BOVA11');
      await movimento.updateTimestamp();
    }

    // id, username, password, email, nome
    res.status(200).json({
      id: usuario.id,
      login: usuario.username,
      name: usuario.nome,
      email: usuario.email,
      usuarioPermit: [
        { modulo: 'home', permit: 4 },
        { modulo: 'usuario', permit: 4 },
      ],
      authorization: 'Bear asdfasdfasdfasd',
      role: 'administrator',
      token: 'asdjfhlakdsfjhlsa',
    });
    return undefined;
  } catch (error) {
    res.status(500).json({ sucesso: false, mensagem: `EXCEPTION: ${error.message}` });
    return undefined;
  }
});

opcoesRouter.get('/usuario/:login_name', async (req, res, next) => {
  try {
    const movimento = new Movimento();
    const login = req.params.login_name;
    const usuario = await movimento.getUsuario(login);

    if (!usuario || usuario.username.toUpperCase() !== login.toUpperCase()) {
      res.status(404).json({ sucesso: false, mensagem: 'usuario não encontrado' });
      return undefined;
    }

    res.status(200).json({
      nsuHost: 0,
      codigoResposta: '00',
      mensagem: 'sucesso',
      usuario: {
        id: usuario.id,
        login: usuario.username,
        name: usuario.nome,
        email: usuario.email,
        usuarioPermit: '',
        authorization: '',
        role: 'administrator',
      },
    });
    return undefined;
  } catch (error) {
    res.status(500).json({ sucesso: false, mensagem: `EXCEPTION: ${error.message}` });
    return undefined;
  }
});

module.exports = opcoesRouter;
