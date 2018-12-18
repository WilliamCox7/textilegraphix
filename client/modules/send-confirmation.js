import axios from 'axios';
import renderEmail from './render-email';
import prepareAttachments from './prepare-attachments';

export default function sendConfirmation(form, orders) {
  return axios.post('/order', {
    form: form,
    orders: orders,
    to: form.contact.email,
    from: `${form.billing.first} ${form.billing.last}`,
    emailBody: renderEmail(form, orders),
    attachments: prepareAttachments(orders)
  }).then((response) => {
    this.props.clearCart();
    this.toggle('waiting');
    return Promise.resolve();
  }).catch((error) => {
    axios.post('/error', {error: error});
  });
}
