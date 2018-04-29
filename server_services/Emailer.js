const SM = require('../server_modules');

module.exports = {
  processOrder: (req, res) => {
    SM.sendOrder(req.body.order, req.body.from, req.body.attachments);
    SM.sendReceipt(req.body.order, req.body.to, req.body.attachments);
    res.status(200).send('Order Sent');
  }
}
