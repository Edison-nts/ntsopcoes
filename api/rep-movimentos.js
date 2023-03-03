const opLabHttp = require('./http-oplab');
const openDbOpcoes = require('./lib-account');

class Movimento {
  constructor() {}

  async getUsuario(login) {
    const db = await openDbOpcoes();
    // id, username, password, email, nome
    const sql = 'SELECT id, username, password, email, nome FROM usuario WHERE username = ?;';
    const ret = await db.get(sql, [login]);
    return ret;
  }

  async getVersao() {
    const db = await openDbOpcoes();
    // id, username, password, email, nome
    const sql = 'SELECT timestamp, versao, habilitado, sincronizando FROM versao;';
    const ret = await db.get(sql, []);
    return ret;
  }

  async updateTimestamp() {
    const db = await openDbOpcoes();
    const timestamp = new Date().getTime();
    const sql = 'UPDATE versao set  timestamp = ?;';
    await db.run(sql, [timestamp]);
  }

  async atualizarAcao(codigo) {
    const { data } = await opLabHttp.detalheAcao(codigo);

    if (data && data.symbol) {
      const symbol = data.symbol;
      const bid = data.bid;
      const ask = data.ask;
      const volume = data.volume;
      const volfin = data.financial_volume;
      const timestamp = new Date().getTime();
      const db = await openDbOpcoes();

      let sql = 'SELECT timestamp FROM  acao WHERE codigo = ?;';
      const ret = await db.get(sql, [symbol]);

      if (ret) {
        sql = 'UPDATE acao SET timestamp = ?, bid = ? , ask = ? WHERE codigo = ?;';
        await db.run(sql, [timestamp, bid, ask, symbol]);
      } else {
        sql = 'INSERT INTO acao (codigo, timestamp, bid , ask) VALUES (?, ?, ?, ?);';
        await db.run(sql, [symbol, timestamp, bid, ask]);
      }
    }

    // codigo, timestamp, bid , ask
  }

  async atualizarOpcoes(codigo) {
    const timestamp = new Date().getTime();
    const { data } = await opLabHttp.listaOpcoes(codigo);

    if (data && data.length > 0) {
      const db = await openDbOpcoes();
      let sql = 'DELETE FROM opcao WHERE parent = ?;';
      await db.run(sql, [codigo]);

      for (const opcao of data) {
        const symbol = opcao.symbol;
        const volume = opcao.volume;
        const volfin = opcao.financial_volume;
        const bid = opcao.bid;
        const ask = opcao.ask;
        const tipo = opcao.type;
        const vencto = opcao.due_date;
        // const vencto = data.block_date;
        const strike = opcao.strike;

        const timeLeft = opcao.days_to_maturity;

        if (timeLeft < 50) {
          // codigo, parent, vencto, tipo, strike, timestamp, bid, ask, volume, volfin
          // ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
          sql =
            'INSERT INTO opcao (codigo, parent, vencto, tipo, strike, timestamp, bid, ask, volume, volfin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
          await db.run(sql, [symbol, codigo, vencto, tipo, strike, timestamp, bid, ask, volume, volfin]);
        }
      }
    }

    /*
         array de 
         {
            "name": "BOVAE CI 103,00 17-03-2023",
            "open": 2.55,
            "high": 2.65,
            "low": 2.25,
            "close": 2.5,
            "maturity_type": "EUROPEAN",
            "variation": -4.58,
            "spot_price": 101.22,
            "days_to_maturity": 11,
            "time": 1677766593588,
        },
    */
  }
}

module.exports = Movimento;
