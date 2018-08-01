import { axios, ReactDOMServer } from '../../../packages';
import { OrderHtml } from '../../../modules';

export default function sendOrder(orderType, orderTotal) {
  if (valid(this.state)) {
    if (orderTotal > 500 && orderType === 'bill-later') {
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
  axios.post('/order', {
    to: self.state.contact.email,
    from: `${self.state.contact.first} ${self.state.contact.last}`,
    order: ReactDOMServer.renderToStaticMarkup(new OrderHtml({
      form: self.state, products: self.props.cart.orders
    }).render()),
    attachments: self.prepareAttachments()
  }).then((response) => {
    orderType === 'bill-later'
    ? self.toggle('thankYou')
    : self.toggle('paymentModal');
    self.toggle('waiting');
    self.toggle('submitted');
  }).catch((error) => {
    axios.post('/error', {error: error});
  });
}

function valid(form) {
  return ((
    form.contact.first && form.contact.last && form.contact.phone &&
    form.contact.email && form.contact.projectName &&
    form.contact.email.toLowerCase() === form.contact.confirm.toLowerCase()
  ) && (
    form.billing.first && form.billing.last && form.billing.address &&
    form.billing.city && form.billing.state && form.billing.zip
  ) && (
    form.shipping.first && form.shipping.last && form.shipping.address &&
    form.shipping.city && form.shipping.state && form.shipping.zip
  ));
}
