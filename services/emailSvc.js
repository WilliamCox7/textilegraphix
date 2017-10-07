const nodemailer = require('nodemailer');

module.exports = {
  sendEmail: (email) => {

    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'willubyu7@gmail.com',
        pass: 'Kmalone32'
      }
    });

    var mailOptions = {
      from: email.from,
      to: 'willubyu7@gmail.com',
      subject: 'New message from ' + email.name,
      text: email.message
    }

    transporter.sendMail(mailOptions);

  }
}