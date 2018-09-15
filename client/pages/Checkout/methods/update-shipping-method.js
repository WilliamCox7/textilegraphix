import { setDelivery } from '../../../modules';

export default function updateShippingMethod(method) {
  let newState = Object.assign({}, this.state);
  let offset = 4;
  newState.selectedShippingMethod = method;
  if (method === '3-day') offset = 3;
  if (method === '2-day') offset = 2;
  if (method === 'next-day') offset = 1;
  newState.delivery = setDelivery(offset)
  this.setState(newState);
}
