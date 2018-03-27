const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = module.exports = express();

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build/index.html'));
});

app.listen(app.get('port'), () => {
  console.log('localhost:' + app.get('port'));
});
