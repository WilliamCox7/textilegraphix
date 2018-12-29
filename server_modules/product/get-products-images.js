const mysql = require('promise-mysql');
const config = require('../../config');
const ErrorModule = require('../error');

module.exports = function getProductsImages(product) {
  let conn;
  return mysql.createConnection(config.mysql)
  .then((c) => conn = c)
  .then(() => {

    return conn.query(`
      SELECT * FROM productImages
      WHERE productId = ${product.id}
    `)
    .catch((err) => ErrorModule.handle(err, 'B-019'))
    .then((images) => {
      let imgObj = {};
      images.forEach((image) => imgObj[image.hex] = [ image.frontUrl, image.backUrl ]);
      return imgObj;
    });

  })
  .then((results) => { conn.end(); return results; })
  .catch((details) => { conn.end(); return details; });
}