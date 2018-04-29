const nodemailer = require('nodemailer');
const config = require('../config');

module.exports = (order, from, attachments) => {

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: config.graphix.email,
      pass: config.graphix.password
    }
  });

  var options = {
    to: config.graphix.to,
    subject: `New order from ${from}`,
    html: order,
    attachments: attachments
  }

  return transporter.sendMail(options);

}
