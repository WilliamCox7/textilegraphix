const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const APP = module.exports = express();

APP.set('port', (process.env.PORT || 3001));
APP.use(bodyParser.json({limit: '50mb'}));
APP.use(express.static(__dirname + '/build'));

require('./routes')(APP);

APP.get('/src/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, `.${req.url}`))
});

APP.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build/index.html'));
});

APP.listen(APP.get('port'), () => {
  console.log('localhost:' + APP.get('port'));
});
