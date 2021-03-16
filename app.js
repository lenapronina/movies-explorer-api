const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const appRouter = require('./routes/index');
const limiter = require('./middlewares/limiter');
const { PORT, MONGO_URL } = require('./configs/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { resMessages, serverErrStatus } = require('./configs/constants');

const app = express();

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.options('*', cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  next();
});

app.use(bodyParser.json());

app.use(limiter);
app.use(helmet());

app.use(requestLogger);

app.use('/', appRouter);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = serverErrStatus, message = resMessages.serverError } = err;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT);
