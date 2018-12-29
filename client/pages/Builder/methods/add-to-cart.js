import html2canvas from 'html2canvas';
import { createGuid, handleError } from '../../../modules';

export default function addToCart() {
  if (this.state.quantity >= 30) {
    this.toggle('waiting');
    let newState = Object.assign({}, this.state);
    newState.guid = createGuid();
    var front = document.getElementById("front-side");
    var back = document.getElementById("back-side");
    var promises = [];
    promises.push(h2c(front));
    promises.push(h2c(back));
    Promise.all(promises).then((mockup) => {
      newState.mockup = mockup;
      this.setState(newState, () => {
        this.props.addOrder(this.state);
        this.toggle('waiting');
        this.props.history.push('/products');
      });
    });
  } else {
    this.setState({errMsg: 'You must have a minimum of 30 shirts to continue.'});
  }
  
}

function h2c(element) {
  return html2canvas(element, { useCORS: true, logging: false })
  .then((canvas) => canvas.toDataURL("image/jpeg"))
  .catch((err) => handleError(err, 'F-001', true));
}
