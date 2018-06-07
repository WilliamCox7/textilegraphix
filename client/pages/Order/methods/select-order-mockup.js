export default function selectOrderMockup(order) {
  let newState = Object.assign({}, this.state);
  newState.mockup = order.mockup;
  newState.guid = order.guid;
  this.setState(newState);
}
