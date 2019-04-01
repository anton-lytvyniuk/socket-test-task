const express = require('express');
const helmet = require('helmet');
const path = require('path');
const bodyParser = require('body-parser');

const appSocket = require('./appSocket');
const indexRouter = require('./routes/index');
const roomsRouter = require('./routes/room');
const { init } = require('./db');

const { APP_SOCK_PORT = 3030, EXPRESS_PORT = 3000 } = process.env;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(helmet());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/rooms', roomsRouter);

app.use('/*', (req, res) => {
  console.log(`Route not found. Protocol: ${req.protocol}; method: ${req.method}; URL: ${`${req.protocol}://${req.get('host')}${req.originalUrl}`}`);
  res.status(404).json({ error: 'Not found' });
});

init().then(() => app.listen(
    EXPRESS_PORT,
    () => {
      console.log(`Listening on port ${EXPRESS_PORT}`);
      appSocket.runInstance(APP_SOCK_PORT);
    },
  )
);
