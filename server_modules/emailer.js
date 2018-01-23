const nodemailer = require('nodemailer');
const pretty = require('js-object-pretty-print').pretty;
const config = require('../config');

module.exports = {

  sendEmail: (email) => {

    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.graphix.email,
        pass: config.graphix.password
      }
    });

    var options = {
      to: config.graphix.to,
      subject: 'New message from ' + email.name,
      text: email.message + `\n\nReply to ${email.name} at ${email.from}.`
    }

    return transporter.sendMail(options);

  },

  sendError: (error) => {

    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.error.email,
        pass: config.error.password
      }
    });

    var options = {
      to: config.error.to,
      subject: "TextileGraphix Error",
      text: error.subject + "\n\n" + error.path + "\n\n" + pretty(error.response)
    }

    return transporter.sendMail(options);

  }

}
