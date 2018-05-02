const sendOrder = require('../server_modules/send-order');
const sendReceipt = require('../server_modules/send-receipt');

module.exports = {

  // sends an order and receipt
  processOrder: (req, res) => {

    Promise.all([
      sendOrder(req.body.order, req.body.from, req.body.attachments),
      sendReceipt(req.body.order, req.body.to, req.body.attachments)
    ])

    .then(() => {
      console.log('Order processed for:', req.body.from);
      res.status(200).send('Order Processed');
    })

    .catch((errorProcessingOrder) => {
      console.log('Error processing order for:', req.body.from);
      res.status(500).send(errorProcessingOrder);
    });

  }

}
