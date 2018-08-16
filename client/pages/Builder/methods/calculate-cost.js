import { calculateTotalCost } from '../../../modules';

export default function calculateCost() {
  let results = calculateTotalCost(this.state);
  this.setState({total: results.totalCost, totalPerShirt: results.costPerShirt});
}
