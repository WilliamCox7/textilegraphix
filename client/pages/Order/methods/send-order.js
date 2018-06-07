import { axios, buildOrderHtml } from '../../../packages';

export default function sendOrder() {
  if (this.state.first && this.state.last && this.state.phone && this.state.email
      && this.state.email.toLowerCase() === this.state.confirm.toLowerCase()) {
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
