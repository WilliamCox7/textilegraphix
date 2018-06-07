import { calculateTotalCost } from '../../../modules';

export default function calculateCost(state) {
  let results = calculateTotalCost(this.state);
  this.setState({total: results.totalCost, totalPerShirt: results.costPerShirt});
}
