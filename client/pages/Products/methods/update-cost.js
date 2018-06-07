import { calculateTotalCost } from '../../../modules';

export default function updateCost(product) {
  let newState = Object.assign({}, this.state);
  let results = calculateTotalCost(this.state.productBuilderInit, product.costOfShirt);
  newState.productBuilderInit.total = results.totalCost;
  newState.productBuilderInit.totalPerShirt = results.costPerShirt;
  this.setState(newState);
}
