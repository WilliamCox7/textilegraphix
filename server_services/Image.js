var fs = require('fs');
var request = require('request');

module.exports = {

  store: (req, res) => {
    download(req.body.url, `tmp/${req.body.guid}.${req.body.ext}`, () => {
      res.status(200).send('done');
    });
  },

  remove: (req, res) => {
    fs.unlink(`tmp/${req.body.guid}.${req.body.ext}`, () => {
      res.status(200).send('done');
    });
  }

}

function download(uri, filename, callback){
  request.head(uri, function(err, res, body) {
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};
