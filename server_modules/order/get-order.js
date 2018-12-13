const mysql = require('promise-mysql');
const config = require('../../config');
const ErrorModule = require('../error');
const getProducts = require('../product/get-products');

module.exports = function getOrder(guid) {
  return mysql.createConnection(config.mysql).then((conn) => {

    let details;

    return conn.query(`
      SELECT *
      FROM orders
      WHERE guid = ${conn.escape(guid)}
    `)
    .then((results) => {
      details = results[0];
      return conn.query(`
        SELECT *
        FROM orderItems
        WHERE orderId = ${conn.escape(results[0].id)}
      `)
      .then((items) => iterate(items.entries(), getItemInfo, conn, []))
    })
    .then((results) => {
      conn.end();
      return {
        details: details,
        orders: results
      };
    })

  });
}

function iterate(iter, cb, conn, updItems) {
  let iteration = iter.next();
  if (iteration.done) {
    return Promise.resolve(updItems);
  }
  let item = iteration.value[1];
  return cb(iter, item, updItems, conn);
}

function getItemInfo(iter, item, updItems, conn) {
  return Promise.all([

    getProducts(item.productId),

    conn.query(`
      SELECT *
      FROM mockups
      WHERE orderItemsId = ${conn.escape(item.id)}
    `),

    conn.query(`
      SELECT *
      FROM sizes
      WHERE orderItemsId = ${conn.escape(item.id)}
    `)

  ])
  .then((results) => {
    item.product = results[0][0];
    item.mockup = [results[1][0].front, results[1][0].back];
    item.XS = results[2][0].XS;
    item.S = results[2][0].S;
    item.M = results[2][0].M;
    item.L = results[2][0].L;
    item.XL = results[2][0].XL;
    item.XL2 = results[2][0].XL2;
    item.XL3 = results[2][0].XL3;
    item.XL4 = results[2][0].XL4;
    item.XL5 = results[2][0].XL5;
    updItems.push(item);
    return iterate(iter, getItemInfo, conn, updItems);
  })
}