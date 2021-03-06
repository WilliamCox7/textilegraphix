const mysql = require('promise-mysql');
const config = require('../../config-sandbox');
const ErrorModule = require('../error');
const fs = require('fs');

module.exports = function saveOrder(form, orders) {
  let conn;
  return mysql.createConnection(config.mysql)
  .then((c) => conn = c)
  .then(() => {

    return Promise.all([

      conn.query(`
        INSERT INTO orders
        (orderNumber, guid, delivery, shippingMethod)
        VALUES
        (${conn.escape(form.orderNumber)}, ${conn.escape(form.guid)}, ${conn.escape(form.delivery)}, ${conn.escape(form.selectedShippingMethod)})
      `)
      .catch((err) => ErrorModule.handle(err, 'B-007'))
      .then((result) => {
        let orderId = result.insertId;
        return Promise.all([

          iterate(orders.entries(), createOrderItem, conn, orderId, form.guid),

          conn.query(`
            INSERT INTO addresses
            (orderId, type, first, last, address, city, state, zip)
            VALUES
            (
              ${conn.escape(orderId)},
              ${conn.escape('billing')},
              ${conn.escape(form.billing.first)},
              ${conn.escape(form.billing.last)},
              ${conn.escape(form.billing.address)},
              ${conn.escape(form.billing.city)},
              ${conn.escape(form.billing.state)},
              ${conn.escape(form.billing.zip)}
            )
          `)
          .catch((err) => ErrorModule.handle(err, 'B-008')),

          conn.query(`
            INSERT INTO addresses
            (orderId, type, first, last, address, city, state, zip)
            VALUES
            (
              ${conn.escape(orderId)},
              ${conn.escape('shipping')},
              ${conn.escape(form.shipping.first)},
              ${conn.escape(form.shipping.last)},
              ${conn.escape(form.shipping.address)},
              ${conn.escape(form.shipping.city)},
              ${conn.escape(form.shipping.state)},
              ${conn.escape(form.shipping.zip)}
            )
          `)
          .catch((err) => ErrorModule.handle(err, 'B-009')),

          conn.query(`
            INSERT INTO contacts 
            (orderId, phone, email)
            VALUES
            (
              ${conn.escape(orderId)},
              ${conn.escape(form.contact.phone)},
              ${conn.escape(form.contact.email)}
            )
          `)
          .catch((err) => ErrorModule.handle(err, 'B-010'))
          
        ]);
      })

    ]);

  })
  .then((results) => { conn.end(); return results; })
  .catch((details) => { conn.end(); return details; });
}

function iterate(iter, cb, conn, orderId, guid) {
  let iteration = iter.next();
  if (iteration.done) {
    return Promise.resolve();
  }
  let order = iteration.value[1];
  return cb(iter, orderId, guid, order, conn);
}

function createOrderItem(iter, orderId, guid, order, conn) {
  return conn.query(`
    INSERT INTO orderItems
    (orderId, productId, quantity, frontColors, backColors, leftSleeveColors, rightSleeveColors, total, totalPerShirt, selectedColor)
    VALUES
    (
      ${conn.escape(orderId)},
      ${conn.escape(order.product.id)},
      ${conn.escape(order.quantity)},
      ${conn.escape(order.frontColors)},
      ${conn.escape(order.backColors)},
      ${conn.escape(order.leftSleeveColors)},
      ${conn.escape(order.rightSleeveColors)},
      ${conn.escape(order.total)},
      ${conn.escape(order.totalPerShirt)},
      ${conn.escape(order.selectedColor)}
    )
  `)
  .catch((err) => ErrorModule.handle(err, 'B-011'))
  .then((result) => {
    let orderItemsId = result.insertId;
    let frontUrl = handleData(order.mockup[0], guid, 'front');
    let backUrl = handleData(order.mockup[1], guid, 'back');
    return Promise.all([

      conn.query(`
        INSERT INTO sizes
        (orderItemsId, XS, S, M, L, XL, XL2, XL3, XL4, XL5)
        VALUES
        (
          ${conn.escape(orderItemsId)},
          ${conn.escape(order.XS || 0)},
          ${conn.escape(order.S || 0)},
          ${conn.escape(order.M || 0)},
          ${conn.escape(order.L || 0)},
          ${conn.escape(order.XL || 0)},
          ${conn.escape(order.XL2 || 0)},
          ${conn.escape(order.XL3 || 0)},
          ${conn.escape(order.XL4 || 0)},
          ${conn.escape(order.XL5 || 0)}
        )
      `)
      .catch((err) => ErrorModule.handle(err, 'B-012')),

      conn.query(`
        INSERT INTO mockups
        (orderItemsId, front, back)
        VALUES
        (
          ${conn.escape(orderItemsId)},
          ${conn.escape(frontUrl)},
          ${conn.escape(backUrl)}
        )
      `)
      .catch((err) => ErrorModule.handle(err, 'B-013'))

    ]);
  })
  .then(() => iterate(iter, createOrderItem, conn, orderId, guid));
}

function handleData(data, guid, side) {
  let fileType = data.indexOf('png') > -1 ? 'png' : 'jpg';
  if (fileType === 'png') data = data.replace(/^data:image\/png;base64,/, "");
  else data = data.replace(/^data:image\/jpeg;base64,/, "");
  let fileName = `${config.host}/orders/${side}-${guid}.${fileType}`;
  let fileLocation = `${getRepoDir()}/build/orders/${side}-${guid}.${fileType}`;
  fs.writeFile(fileLocation, data, 'base64', (err) => err ? ErrorModule.handle(err, 'B-022') : null);
  return fileName;
}

function getRepoDir() {
  let folders =  __dirname.split("/")
  folders.pop();
  folders.pop()
  return folders.join("/");
}