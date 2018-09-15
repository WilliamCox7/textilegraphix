import { calculateTotalCost } from '../../../modules';

export default function calculateCost(order) {
  let results = calculateTotalCost(order);
  let updOrder = Object.assign({}, order);
  updOrder.total = results.totalCost;
  this.props.updOrder(updOrder);
}
