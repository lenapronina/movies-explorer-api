const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { allErrorHandler } = require('./middlewares/errorHandler');
const appRouter = require('./routes/index');
const limiter = require('./middlewares/limiter');

const app = express();

const { PORT, MONGO_URL } = require('./configs/config');

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use(limiter);
app.use(helmet());

app.use(requestLogger);

app.use('/', appRouter);

app.use(errorLogger);

app.use(errors());

app.use(allErrorHandler);

app.listen(PORT);
