const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = require('./middlewares/rateLimit');
const router = require('./routes/index');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов

app.use(limiter);

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });

  next();
});

app.listen(PORT);
