const fs = require('fs-extra');
const { OPEN_READWRITE, OPEN_CREATE, Database, verbose } = require('./lib-sqlite-async');
const _opDbFile = `${__dirname}/db/opcoes.sqlite`;
const _modulo = 'lib-database.sqlite';

class DbSqlite {
  constructor() {
    this.conn = undefined;
  }

  async open() {
    this.conn = await Database.open(_opDbFile, OPEN_READWRITE | OPEN_CREATE);
  }

  async close() {
    this.conn.close();
  }

  // ret = await this.conn.get(sql);

  async get(sql, parms) {
    return await this.conn.get(sql, parms);
  }

  async all(sql, parms) {
    return await this.conn.all(sql, parms);
  }

  async run(sql, parms) {
    return await this.conn.run(sql, parms);
  }

  async exec(sql) {
    return await this.conn.exec(sql);
  }

  criarTabelas = async () => {
    try {
      let versao = process.env.DB_VERSION;
      // milisegundos
      let timestamp = new Date().getTime();

      let sql = `CREATE TABLE usuario (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(50), password VARCHAR(50), email VARCHAR(255), nome VARCHAR(255));`;

      await this.conn.exec(sql);

      sql = `CREATE TABLE movimento (id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp BIGINT, codigo VARCHAR(32), tipo CHAR(32), operacao CHAR(1), qtde DECIMAL, valor DECIMAL );`;
      await this.conn.exec(sql);

      sql = `CREATE TABLE acao (codigo VARCHAR(32) PRIMARY KEY, timestamp BIGINT, bid DECIMAL, ask DECIMAL);`;
      await this.conn.exec(sql);

      sql = `CREATE TABLE opcao (codigo VARCHAR(32) PRIMARY KEY, parent VARCHAR(32), vencto VARCHAR(32), tipo CHAR(1), strike DECIMAL, timestamp BIGINT, bid DECIMAL, ask DECIMAL, volume DECIMAL, volfin DECIMAL);`;
      await this.conn.exec(sql);

      sql = `CREATE TABLE versao (timestamp BIGINT, versao VARCHAR(32), habilitado INT, sincronizando INT)`;
      await this.conn.exec(sql);

      sql = `INSERT INTO versao (timestamp, versao, habilitado, sincronizando) VALUES (?,?,1, 0);`;
      await this.conn.run(sql, [timestamp, versao]);

      return { sucesso: true, mensagem: 'SUCESSO' };
    } catch (error) {
      console.error('lib-account', error);
      return { sucesso: false, mensagem: `ERROR: ${error.message}` };
    }
  };
}

openDbOpcoes = async () => {
  try {
    const db = new DbSqlite();
    await db.open();
    return db;
  } catch (error) {
    return undefined;
  }
};

module.exports = openDbOpcoes;
