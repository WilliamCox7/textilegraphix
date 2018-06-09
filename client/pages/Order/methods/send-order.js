import { axios } from '../../../packages';
import { buildOrderHtml } from '../../../modules';

export default function sendOrder(orderType) {
  if (valid(this.state)) {
    this.toggle('waiting');
    axios.post('/order', {
      to: this.state.email,
      from: `${this.state.first} ${this.state.last}`,
      order: buildOrderHtml(this.state, this.props.cart.orders, orderType),
      attachments: this.prepareAttachments()
    }).then((response) => {
      this.toggleThankYou();
      this.toggle('waiting');
    }).catch((error) => {
      axios.post('/error', {error: error});
    });
  } else {
    this.setState({error: true});
  }
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
