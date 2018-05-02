const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const OrderSvc = require('./server_services/Order');
const ErrorSvc = require('./server_services/Error');

const app = module.exports = express();

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(__dirname + '/build'));

app.post('/order', OrderSvc.processOrder);
app.post('/error', ErrorSvc.sendError);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build/index.html'));
});

app.listen(app.get('port'), () => {
  console.log('localhost:' + app.get('port'));
});
