import { handleError } from "../../../modules";

export default function sendOrder(orderType, orderTotal) {
  if (valid(this.state)) {
    send(this, orderType);
    // if (orderTotal < 500 && orderType === 'bill-later') {
    //   this.setState({error: 'Order must be over $500 to select this option'});
    // } else {
    //   send(this, orderType);
    // }
  } else {
    this.setState({error: '* Please fill in all required fields'});
  }
}

function send(self, orderType) {
  self.toggle('waiting');
  if (orderType === 'buy-now') {
    self.toggle('paymentModal');
    self.props.storeForm(self.state);
  } else {
    self.sendConfirmation(self.state, self.props.cart.orders)
    .then(() => self.props.history.push(`/view?guid=${self.state.guid}`))
    .catch(() => {});
  }
}

function valid(form) {
  return ((
    form.contact.phone && form.contact.email &&
    form.contact.email.toLowerCase() === form.contact.confirm.toLowerCase()
  ) && (
    form.billing.first && form.billing.last && form.billing.address &&
    form.billing.city && form.billing.state && form.billing.zip
  ) && (
    form.shipping.first && form.shipping.last && form.shipping.address &&
    form.shipping.city && form.shipping.state && form.shipping.zip
  ));
}
