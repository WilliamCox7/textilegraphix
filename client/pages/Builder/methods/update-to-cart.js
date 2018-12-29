import html2canvas from 'html2canvas';
import { handleError } from '../../../modules';

export default function addProductToCart() {
  this.toggle('waiting');
  let newState = Object.assign({}, this.state);
  var front = document.getElementById("front-side");
  var back = document.getElementById("back-side");
  var promises = [];
  promises.push(h2c(front));
  promises.push(h2c(back));
  Promise.all(promises).then((mockup) => {
    newState.mockup = mockup;
    this.setState(newState, () => {
      this.props.updOrder(this.state);
      this.toggle('waiting');
      this.props.history.push('/cart');
    });
  });
}

function h2c(element) {
  return html2canvas(element, { useCORS: true, logging: false })
  .then((canvas) => canvas.toDataURL("image/jpeg"))
  .catch((err) => handleError(err, 'F-003', true));
}
