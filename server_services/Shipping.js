const Easypost = require('@easypost/api');
const config = require('../config');
const api = new Easypost(config.easypost.key);

module.exports = {

  // creates a shipment to determine rate
  createShipment: (req, res) => {
    const toAddress = new api.Address({ zip: req.body.zip });
    const fromAddress = new api.Address({
      street1: "1154 Stocks Ave",
      city: "Rexburg",
      state: "ID",
      zip: "83440",
      country: "US"
    });
    const parcel = new api.Parcel({ weight: req.body.weight });

    const shipment = new api.Shipment({
      to_address: toAddress,
      from_address: fromAddress,
      parcel: parcel
    });

    shipment.save()
    .then((saved) => {
      res.status(200).send(saved);
    })
    .catch((error) => {
      res.status(error.status).send(error);
    });
  }

}
