const nodemailer = require('nodemailer');
const config = require('../config');

module.exports = {

  sendEmail: (email) => {

    // authenticates outgoing message
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.graphix.email,
        pass: config.graphix.password
      }
    });

    // provides the message details and options
    var options = {
      to: config.graphix.to,
      subject: 'New message from ' + email.name,
      text: email.message + `\n\nReply to ${email.name} at ${email.from}.`
    }

    // sends the email with the provided options
    return transporter.sendMail(options);

  }

}
