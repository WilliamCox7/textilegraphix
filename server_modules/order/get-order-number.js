const mysql = require('promise-mysql');
const config = require('../../config-sandbox');
const ErrorModule = require('../error');

module.exports = function getOrderNumber() {
  let conn;
  return mysql.createConnection(config.mysql)
  .then((c) => conn = c)
  .then(() => {

    return conn.query(`SELECT IFNULL(MAX(orderNumber), 1000) + 1 AS orderNumber FROM orders`)
    .catch((err) => ErrorModule.handle(err, 'B-003'));

  })
  .then((results) => { conn.end(); return results; })
  .catch((details) => { conn.end(); return details; });
}