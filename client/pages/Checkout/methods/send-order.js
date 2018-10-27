import axios from 'axios';
import ReactDOMServer from "react-dom/server";
import { renderEmail } from '../../../modules';

export default function sendOrder(orderType, orderTotal) {
  if (valid(this.state)) {
    if (orderTotal < 500 && orderType === 'bill-later') {
      this.setState({error: 'Order must be over $500 to select this option'});
    } else {
      send(this, orderType);
    }
  } else {
    this.setState({error: '* Please fill in all required fields'});
  }
}

function send(self, orderType) {
  self.toggle('waiting');
  if (orderType === 'buy-now') {
    self.toggle('paymentModal');
  } else {
    axios.post('/order', {
      to: self.state.contact.email,
      from: `${self.state.billing.first} ${self.state.billing.last}`,
      order: renderEmail(self.state, self.props.cart.orders),
      attachments: self.prepareAttachments()
    }).then((response) => {
      self.props.clearCart();
      self.toggle('waiting');
    }).catch((error) => {
      axios.post('/error', {error: error});
    });
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
