const config = require('../config');
const nodemailer = require('nodemailer');
const pretty = require('js-object-pretty-print').pretty;

module.exports = {

  // sends an email notifying the administrator of an error
  sendError: (req, res) => {

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
      subject: `Textile Graphix Error`,
      text: pretty(req.body.error)
    }

    transporter.sendMail(options)
    .then(() => {
      res.status(200).send('Error Message Sent');
    });

  }

}
