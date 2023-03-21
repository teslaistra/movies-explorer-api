const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');

const limiter = require('./middlewares/rateLimit');
const cors = require('./middlewares/cors');
const router = require('./routes/index');

const { PORT = 3000, DB_URL } = process.env;

const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов

app.use(limiter);

app.use(cors);

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
