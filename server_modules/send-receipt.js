const nodemailer = require('nodemailer');
const config = require('../config');

module.exports = (order, to, attachments) => {

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: config.graphix.email,
      pass: config.graphix.password
    }
  });

  var options = {
    to: to,
    subject: `Textile Graphix Receipt`,
    html: order,
    attachments: attachments
  }

  return transporter.sendMail(options);

}
