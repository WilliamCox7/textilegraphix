import { calculateTotalCost } from '../../../modules';

export default function calculateCost(order) {
  let results = calculateTotalCost({
    order: order
  });
  return results;
}
