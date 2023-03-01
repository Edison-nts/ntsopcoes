/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { subTitleCSS, monitorCSS } from '../style';
import PopMessage from './pop-message';

const ShowError = (props) => {
  const { error, url, mensagemPadrao } = props;
  const [mensagem, setMensagem] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [popMessage, setPopMessage] = React.useState({ mensagem: undefined, tipo: undefined });

  const mostrarErro = () => {
    let msg = mensagemPadrao;
    let notFound = false;
    console.warn('ShowError - ', error);

    if (error.retCod === 404 || error.data?.retCode === 404) {
      notFound = true;
      msg = 'Nenhum registro encontrado';
    } else if (error.retCod === -1) {
      msg = 'Sem resposta do servidor';
    } else if (error.retCod >= 500) {
      msg = 'Falha interna do servidor';
    } else {
      msg = error.mensagem ?? error.message;
    }

    if (notFound) {
      return;
    }

    if (!msg) {
      msg = mensagemPadrao;
    }

    setShow(true);
    setPopMessage({mensagem: msg, tipo: 'error'})

    const u = url ? url : 'undefined';
    const errMessage = error.message;
    const errCause = error.cause;

    msg = JSON.stringify({ mensagem: msg, url: u, detalhes: error, errMessage, errCause }, null, 4);
    setMensagem(msg);
  };

  React.useEffect(() => {
    if (error !== undefined) mostrarErro();
  }, [error]);

  if (show) {
    return (
      <React.Fragment>
        <Typography sx={subTitleCSS}>ERRO AO PROCESSAR REQUEST</Typography>
        <Box sx={monitorCSS}>{mensagem}</Box>
        <PopMessage mensagem={popMessage.mensagem} tipo={popMessage.tipo} />
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default ShowError;
