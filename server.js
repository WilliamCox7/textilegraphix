const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const Emailer = require('./server_modules/emailer');
const app = module.exports = express();

app.set('port', (process.env.PORT || config.port));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(__dirname + '/build'));

// routes
app.post('/sendemail', (req, res) => {
  Emailer.sendEmail(req.body);
  res.status(200).send('');
});

app.post('/senderror', (req, res) => {
  Emailer.sendError(req.body);
  res.status(200).send('');
});

app.post('/order', (req, res) => {
  Emailer.sendOrder(req.body);
  res.status(200).send('');
});

app.listen(app.get('port'), () => {
  console.log('localhost:' + app.get('port'));
});
