const axios = require('axios');

const OPLAB_URL = process.env.OPLAB_URL;
const OPLAB_TOKEN = process.env.OPLAB_TOKEN;
const OPLAB_HEADER = process.env.OPLAB_HEADER;

const httpApi = axios.create({
  baseURL: OPLAB_URL,
});

class OpLabHttp {
  constructor(http) {
    this.http = httpApi;
    this.url = '';
    this.config = {
      headers: {
        'Access-Token': OPLAB_TOKEN,
      },
    };
  }

  listaOpcoes(codigo) {
    // https://api.oplab.com.br/v3/market/options/BOVA11

    const resource = 'market/options';
    this.url = `${OPLAB_URL}/${resource}/${codigo}`;
    console.log(`GET: ${this.url}`);
    const ret = this.http.get(`/${resource}/${codigo}`, this.config);
    return ret;
  }

  detalheOpcao(codigo) {
    // https://api.oplab.com.br/v3/market/stocks/VALE3

    const resource = 'market/options/details';
    this.url = `${OPLAB_URL}/${resource}/${codigo}`;
    console.log(`GET: ${this.url}`);
    const ret = this.http.get(`/${resource}/${codigo}`, this.config);
    return ret;
  }

  detalheAcao(codigo) {
    // https://api.oplab.com.br/v3/market/options/details/PETRP274

    const resource = 'market/stocks';
    this.url = `${OPLAB_URL}/${resource}/${codigo}`;
    console.log(`GET: ${this.url}`);
    const ret = this.http.get(`/${resource}/${codigo}`, this.config);
    return ret;
  }
}

const opLabHttp = new OpLabHttp(httpApi);

module.exports = opLabHttp;
