const config = require('../../config');
const nodemailer = require('nodemailer');

module.exports = (order, from, attachments) => {

  var auth = {
    user: config.graphix.email,
    pass: config.graphix.password
  }

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: auth
  });

  var options = {
    to: config.graphix.to,
    subject: `New order from ${from}`,
    html: order,
    attachments: attachments
  }

  return transporter.sendMail(options)
  .catch((err) => handleError(err, 'B-016'));

}
