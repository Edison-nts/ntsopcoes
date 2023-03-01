/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useSnackbar } from 'notistack';

const PopMessage = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const [mensagem, setMensagem] = React.useState("");

    React.useEffect(() => {
        if (props.mensagem && props.tipo && mensagem !== props.mensagem) {
            setMensagem(props.mensagem);
            enqueueSnackbar(props.mensagem, { variant: props.tipo });
        }
           
    }, [props]);

    return null;

}

export default PopMessage;
