const AuthModule = require('../server_modules/authorize');

module.exports = {

  // authorizes a credit card for later charge
  authorize: (req, res) => {

    AuthModule.authorizeCreditCard(req.body)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send(err));

  }

}
