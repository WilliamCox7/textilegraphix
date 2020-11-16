const AuthModule = require('../server_modules/authorize');

module.exports = {

  // authorizes a credit card for later charge
  authorize: (req, res) => {

    setTimeout(() => {
      res.status(200).send({ msg: "success" });
    }, 1000);

  }

}
