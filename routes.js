const OrderSvc = require('./server_services/Order');
const ErrorSvc = require('./server_services/Error');
const ProductSvc = require('./server_services/Product');
const AuthNetSvc = require('./server_services/AuthNet');

module.exports = (app) => {

  // GET
  app.get('/products/ssaw', ProductSvc.getProducts);

  // POST
  app.post('/order', OrderSvc.processOrder);
  app.post('/error', ErrorSvc.sendError);
  app.post('/authorize', AuthNetSvc.authorize);
  
}
