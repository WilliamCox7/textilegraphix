const authorizeCreditCard = require('../server_modules/authorize-credit-card');

module.exports = {

  // authorizes a credit card for later charge
  authorize: (req, res) => {

    authorizeCreditCard(req.body).then((response) => {
      res.status(200).send(response);
    });

  }

}
