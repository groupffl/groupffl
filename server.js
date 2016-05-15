require('dotenv').config();

const debug = require('debug')('ffln:server');
const http = require('http');

const express = require('express');

const bodyParser = require('body-parser');
const chalk = require('chalk');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const Helmet = require('react-helmet');

global.models = path.join(__dirname, '/models/');

const app = express();

const mongoose = require('mongoose');
const mongoUrl = process.env.MLAB_URI || 'mongodb://localhost/fflnm';

const mongoConnectMsg = process.env.MLAB_URI ? '.' : chalk.cyan(` ${mongoUrl}`);

mongoose.connect(mongoUrl, err => {
  console.log(err ? chalk.red(err) : chalk.blue.bold(`Connected to MongoDB${mongoConnectMsg}`));
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', require('./routes/api'));



app.use('/*', (req, res) => {
  var head = Helmet.rewind();
  const html = `
  <!DOCTYPE html>
  <html ${head.htmlAttributes.toString()} lang="en">
  <head>
    ${head.title.toString()}
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="google-site-verification" content="cMlN8L9GeFFsaAT5zymDbxz5vl-ROjhp5s6ydhBhVRw" />
    <script src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <link rel="shortcut icon" href="http://i.imgur.com/AgquJCe.gif" type="image/x-icon">
    <link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-2.2.2.min.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <script src="/bundle.js"></script>
  </body>
  </html>
  `;
  res.write(html);
});

app.use((req, res, next) => {
  'use strict';
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', { err });
  });
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + port;
  debug('Listening on ' + bind);
  console.log(chalk.blue.bold(`Listening at ${chalk.green.underline(`http://localhost:${port}`)}`));
}
