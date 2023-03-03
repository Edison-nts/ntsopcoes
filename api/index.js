require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');

const opcoesRouter = require('./controller-opcoes');
const opLabRouter = require('./controller-oplab');
const swaggerDocument = require('./swagger.json');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(_logger.LogAccess);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/api', opcoesRouter);
app.use('/oplab', opLabRouter);

// return default no route
app.use((req, res, next) => {
  try {
    res.status(404).json({ sucesso: false, mensagem: 'Not found' });
  } catch (error) {
    console.log('error em Recurso inexistente', error);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(` ... server started at port: ${port}`);
});
