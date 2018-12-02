const config = require('../../config');
const nodemailer = require('nodemailer');

module.exports = (order, to, attachments) => {

  var auth = {
    user: config.graphix.email,
    pass: config.graphix.password
  }

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: auth
  });

  var options = {
    to: to,
    subject: `Textile Graphix Receipt`,
    html: order,
    attachments: attachments
  }

  return transporter.sendMail(options);

}
