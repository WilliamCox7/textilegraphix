const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Emailer = require('./server_services/Emailer');
const app = module.exports = express();

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(__dirname + '/build'));

app.post('/order', Emailer.processOrder);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build/index.html'));
});

app.listen(app.get('port'), () => {
  console.log('localhost:' + app.get('port'));
});
