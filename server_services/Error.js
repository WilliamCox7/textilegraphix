const ErrorModule = require('../server_modules/error');

module.exports = {

  // sends an email notifying the administrator of an error
  sendError: (req, res) => {

    ErrorModule.send(req.body)
    .then(() => res.status(200).send('Error Message Sent'))
    .catch((err) => res.status(500).send(err));

  }

}
