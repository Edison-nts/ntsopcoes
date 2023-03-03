const { Router } = require('express');
const opLabHttp = require('./http-oplab');

const opLabRouter = Router();

opLabRouter.get('/opcoes/:codigo', async (req, res) => {
  try {
    const codigo = req.params.codigo;
    console.log(`executando lista opcoes: ${codigo}`);
    const { data } = await opLabHttp.listaOpcoes(codigo);
    res.status(200).json(data);
    return undefined;
  } catch (error) {
    console.error(error.mensagem);
    res.status(500).json({
      error: error.message,
      usermessage: 'falha ao executar request',
    });
  }
});

opLabRouter.get('/opcao/:codigo', async (req, res) => {
  try {
    const codigo = req.params.codigo;
    console.log(`executando detalhe opcao: ${codigo}`);
    const { data } = await opLabHttp.detalheOpcao(codigo);
    res.status(200).json(data);
    return undefined;
  } catch (error) {
    console.error(error.mensagem);
    res.status(500).json({
      error: error.message,
      usermessage: 'falha ao executar request',
    });
  }
});

opLabRouter.get('/acao/:codigo', async (req, res) => {
  try {
    const codigo = req.params.codigo;
    console.log(`executando detalhe acao: ${codigo}`);
    const { data } = await opLabHttp.detalheAcao(codigo);
    res.status(200).json(data);
    return undefined;
  } catch (error) {
    console.error(error.mensagem);
    res.status(500).json({
      error: error.message,
      usermessage: 'falha ao executar request',
    });
  }
});

module.exports = opLabRouter;
