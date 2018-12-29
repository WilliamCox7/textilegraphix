const mysql = require('promise-mysql');
const config = require('../../config');
const getProductsPrintArea = require('./get-products-print-area');
const getProductsImages = require('./get-products-images');
const getProductsColors = require('./get-products-colors');
const ErrorModule = require('../error');

module.exports = function getProducts(id) {
  let conn;
  return mysql.createConnection(config.mysql)
  .then((c) => conn = c)
  .then(() => {

    let whereclause = '';

    if (id) {
      whereclause = `WHERE id = ${conn.escape(id)}`;
    }

    let products;
    return conn.query(`SELECT * FROM products ${whereclause}`)
    .catch((err) => ErrorModule.handle(err, 'B-021'))
    .then((results) => products = results)
    .then(() => iterate(products.entries(), getProductDetails, []))
    .then((fullProducts) => fullProducts);

  })
  .then((results) => { conn.end(); return results; })
  .catch((details) => { conn.end(); return details; });
}

function iterate(iter, cb, fullProducts) {
  let iteration = iter.next();
  if (iteration.done) {
    return Promise.resolve(fullProducts);
  }
  let product = iteration.value[1];
  return cb(product)
  .then((p) => {
    fullProducts.push(p);
    return iterate(iter, cb, fullProducts);
  });
}

function getProductDetails(product) {
  return getProductsPrintArea(product)
  .then((printArea) => product.printArea = printArea)
  .then(() => getProductsImages(product))
  .then((images) => product.images = images)
  .then(() => getProductsColors(product))
  .then((colors) => product.colors = colors)
  .then(() => product)
  .catch((err) => Promise.reject(err));
}