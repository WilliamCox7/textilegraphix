const config = require('../../config');
const nodemailer = require('nodemailer');
const handleError = require('./handle');
// const pretty = require('js-object-pretty-print').pretty;

module.exports = function send(postBody) {

  var auth = {
    user: config.error.email,
    pass: config.error.password
  }

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: auth
  });

  var options = {
    to: config.error.to,
    subject: `Textile Graphix Error (${postBody.errorId})`,
    html: `<pre>${JSON.stringify(postBody, 'utf8', 2)}</pre>`
  }

  return transporter.sendMail(options)
  .catch((err) => handleError(err, 'B-001'));

}