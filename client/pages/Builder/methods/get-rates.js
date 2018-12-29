import axios from 'axios';
import { handleError } from '../../../modules';

export default function getRates() {
  if (this.state.zip.length === 5) {
    if (this.state.showZip) this.toggle('waiting2');
    let requestBody = {
      zip: this.state.zip,
      weight: this.state.product.weight * this.state.quantity
    }
    axios.post('/shipping', requestBody)
    .then((response) => {
      if (this.state.showZip) this.toggle('waiting2');
      let groundRate, shippingOffset = 0;
      if (response.data.rates.length) {
        groundRate = response.data.rates.find((rate) => rate.carrier === 'UPS' && rate.service === 'Ground').rate;
        shippingOffset = Number(groundRate) / this.state.quantity;
      }
      this.calculateCost(this.state, shippingOffset);
      this.setState({
        rates: response.data.rates.filter((rate) => rate.carrier === 'UPS'),
        showZip: false,
        shippingOffset: shippingOffset
      });
    })
    .catch((err) => handleError(err, 'F-002'));
  } else {
    // error message
  }
}
