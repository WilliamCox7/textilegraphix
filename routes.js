const OrderSvc = require('./server_services/Order');
const ErrorSvc = require('./server_services/Error');
const ProductSvc = require('./server_services/Product');
const AuthNetSvc = require('./server_services/AuthNet');
const ShippingSvc = require('./server_services/Shipping');

module.exports = (app) => {

  // GET
  app.get('/api/products', ProductSvc.get);

  // POST
  app.post('/order', OrderSvc.processOrder);
  app.post('/error', ErrorSvc.sendError);
  app.post('/authorize', AuthNetSvc.authorize);
  app.post('/shipping', ShippingSvc.createShipment);

}
