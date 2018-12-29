const ShippingModule = require('../server_modules/shipping');

module.exports = {

  // creates a shipment to determine rate
  createShipment: (req, res) => {
    ShippingModule.create(req.body)
    .then((saved) => res.status(200).send(saved))
    .catch((err) => res.status(500).send(err));
  }

}
