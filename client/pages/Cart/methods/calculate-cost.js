import { calculateTotalCost } from '../../../modules';

export default function calculateCost(order) {
  let results = calculateTotalCost({
    order: order,
    shippingOffset: order.shippingOffset
  });
  let updOrder = Object.assign({}, order);
  updOrder.total = results.totalCost;
  this.props.updOrder(updOrder);
}
