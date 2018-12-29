const mysql = require('promise-mysql');
const config = require('../../config');
const ErrorModule = require('../error');

module.exports = function getProductsColors(product) {
  let conn;
  return mysql.createConnection(config.mysql)
  .then((c) => conn = c)
  .then(() => {

    return conn.query(`
      SELECT * FROM productColors
      WHERE productId = ${product.id}
    `)
    .catch((err) => ErrorModule.handle(err, 'B-018'));

  })
  .then((results) => { conn.end(); return results; })
  .catch((details) => { conn.end(); return details; });
}