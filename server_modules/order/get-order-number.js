const mysql = require('promise-mysql');
const config = require('../../config');
const ErrorModule = require('../error');

module.exports = function getOrder(guid) {
  return mysql.createConnection(config.mysql).then((conn) => {

    return conn.query(`SELECT MAX(orderNumber) + 1 AS orderNumber FROM orders`);

  });
}