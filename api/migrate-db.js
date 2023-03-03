require('dotenv').config({ path: __dirname + '/.env' });
const openDbOpcoes = require('./lib-account');

const criate = async () => {
  const db = await openDbOpcoes();
  await db.criarTabelas();
  console.log('tabelas criadas com sucesso');
  return 'criate - ok';
};

const update = async () => {
  const db = await openDbOpcoes();
  // username, password, email, nome
  let sql = `INSERT INTO usuario (username, password, email, nome) values ('egoncalez', 'Rt5100pl', 'edison@nts.com.br', 'Edison Goncalez');`;
  await db.exec(sql);
  console.log('update com sucesso');
  return 'update - ok';
};

const process = async () => {
  await criate();
  await update();
};

process()
  .then((retorno) => {})
  .catch((error) => {
    console.error(error);
  });
