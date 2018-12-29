const OrderModule = require('../server_modules/order');

module.exports = {

  // sends an order and receipt
  processOrder: (req, res) => {
    Promise.all([
      OrderModule.saveOrder(req.body.form, req.body.orders),
      OrderModule.sendOrder(req.body.emailBody, req.body.from, req.body.attachments),
      OrderModule.sendReceipt(req.body.emailBody, req.body.to, req.body.attachments)
    ])
    .then(() => res.status(200).send('Order Processed'))
    .catch((err) => res.status(500).send(err));
  },

  get: (req, res) => {
    OrderModule.getOrder(req.params.guid)
    .then((order) => res.status(200).send(order))
    .catch((err) => res.status(500).send(err));
  },

  getOrderNumber: (req, res) => {
    OrderModule.getOrderNumber()
    .then((orderNumber) => res.status(200).send(orderNumber))
    .catch((err) => res.status(500).send(err));
  }

}
