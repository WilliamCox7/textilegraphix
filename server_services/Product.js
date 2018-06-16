let request = require("request");
let config = require("../config");

module.exports = {

  getProducts: (req, res) => {
    request({
      method: 'GET',
      url: `https://api.ssactivewear.com/v2/products/?mediatype=json&style=21,56,36,20`,
      headers: {
        "Cache-Control": 'no-cache',
        "Authorization": "Basic " + new Buffer(config.ssaw.account + ":" + config.ssaw.key).toString("base64")
      }
    }, (error, response, body) => {
      error
      ? res.status(500).send(error)
      : res.status(200).send(body);
    });
  }

}
