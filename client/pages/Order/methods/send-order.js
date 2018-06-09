import { axios } from '../../../packages';
import { buildOrderHtml } from '../../../modules';

export default function sendOrder() {
  if (valid(this.state)) {
    this.toggle('waiting');
    axios.post('/order', {
      to: this.state.email,
      from: `${this.state.first} ${this.state.last}`,
      order: buildOrderHtml(this.state, this.props.cart.orders),
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
  return (
    form.first && form.last && form.phone && form.email && form.projectName &&
    form.email.toLowerCase() === form.confirm.toLowerCase()
  );
}
