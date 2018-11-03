import { calculateTotalCost } from '../../../modules';

export default function calculateCost(order, shippingRate) {
  let results = calculateTotalCost({
    order: order || this.state,
    shippingOffset: shippingRate
  });
  this.setState({
    total: results.totalCost,
    totalPerShirt: results.costPerShirt,
    sizeOffsets: results.sizeOffsets
  });
}
