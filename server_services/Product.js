let ProductModule = require('../server_modules/product');

module.exports = {

  get: (req, res) => {
    ProductModule.getProducts()
    .then((products) => res.status(200).send(products))
    .catch((err) => res.status(500).send(err));
  }

}
