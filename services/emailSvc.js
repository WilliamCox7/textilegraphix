const nodemailer = require('nodemailer');

module.exports = {
  sendEmail: (email) => {

    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'textilegraphix@gmail.com',
        pass: 'xxx'
      }
    });

    var mailOptions = {
      from: email.from,
      to: 'design@textilegraphix.com',
      subject: 'New message from ' + email.name,
      text: email.message
    }

    transporter.sendMail(mailOptions);

  }
}
