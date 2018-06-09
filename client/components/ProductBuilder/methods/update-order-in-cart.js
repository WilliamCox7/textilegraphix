import { domtoimage } from '../../../packages';

export default function addProductToCart() {
  this.toggle('waiting');
  let newState = Object.assign({}, this.state);
  var front = document.getElementById("front-side");
  var back = document.getElementById("back-side");
  var promises = [
    domtoimage.toPng(front),
    domtoimage.toPng(back)
  ]
  Promise.all(promises).then((mockup) => {
    newState.mockup = mockup;
    this.setState(newState, () => {
      this.props.updOrder(this.state);
      this.props.closeBuilder();
      this.toggle('waiting');
    });
  });
}
