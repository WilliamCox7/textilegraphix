import axios from 'axios';
import renderEmail from './render-email';
import prepareAttachments from './prepare-attachments';

export default function sendConfirmation(form, orders) {
  axios.post('/order', {
    to: form.contact.email,
    from: `${form.billing.first} ${form.billing.last}`,
    order: renderEmail(form, orders),
    attachments: prepareAttachments(orders)
  }).then((response) => {
    this.props.clearCart();
    this.toggle('waiting');
  }).catch((error) => {
    axios.post('/error', {error: error});
  });
}
