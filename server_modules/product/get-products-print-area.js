const mysql = require('promise-mysql');
const config = require('../../config');
const ErrorModule = require('../error');

module.exports = function getProductsPrintArea(product) {
  let conn;
  return mysql.createConnection(config.mysql)
  .then((c) => conn = c)
  .then(() => {

    return conn.query(`
      SELECT * FROM productPrintArea
      WHERE productId = ${product.id}
    `)
    .catch((err) => ErrorModule.handle(err, 'B-020'))
    .then((areas) => {
      let printAreas = [];
      areas.forEach((area) => {
        if (area.side === 0) {
          printAreas.unshift({
            width: area.width,
            height: area.height,
            top: area.top,
            left: area.left
          });
        } else {
          printAreas.push({
            width: area.width,
            height: area.height,
            top: area.top,
            left: area.left
          });
        }
      });
      return printAreas;
    });

  })
  .then((results) => { conn.end(); return results; })
  .catch((details) => { conn.end(); return details; });
}