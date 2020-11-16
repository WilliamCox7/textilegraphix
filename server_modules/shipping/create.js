const Easypost = require('@easypost/api');
const config = require('../../config-sandbox');
// const api = new Easypost(config.easypost.key);
const ErrorModule = require('../error');

module.exports = function create(postBody) {
  let toAddress = new api.Address({ zip: postBody.zip });
  let fromAddress = new api.Address({
    street1: "1154 Stocks Ave",
    city: "Rexburg",
    state: "ID",
    zip: "83440",
    country: "US"
  });
  let parcel = new api.Parcel({ weight: postBody.weight * 16 });
  let shipment = new api.Shipment({
    to_address: toAddress,
    from_address: fromAddress,
    parcel: parcel
  });
  return shipment.save()
  .catch((err) => ErrorModule.handle(err, 'B-002'));
}