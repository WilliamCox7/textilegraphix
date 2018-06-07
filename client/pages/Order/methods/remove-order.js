export default function removeOrder(guid) {
  let foundUnselected = false, index = 0;
  if (guid === this.state.guid) {
    while (!foundUnselected) {
      if (guid !== this.props.cart.orders[index].guid) {
        this.selectOrderMockup(this.props.cart.orders[index]);
        foundUnselected = true;
      } else if (this.props.cart.orders.length - 1 === index) {
        this.selectOrderMockup({
          mockup: undefined,
          guid: undefined
        });
        foundUnselected = true;
      }
      index++;
    }
  }
  this.props.removeOrder(guid);
}
