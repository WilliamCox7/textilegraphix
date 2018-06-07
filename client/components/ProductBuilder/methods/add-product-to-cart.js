import { domtoimage } from '../../../packages';

export default function addProductToCart() {
  this.toggle('waiting');
  let newState = Object.assign({}, this.state);
  newState.guid = this.createGuid();
  var front = document.getElementById("front-side");
  var back = document.getElementById("back-side");
  var promises = [
    domtoimage.toPng(front),
    domtoimage.toPng(back)
  ]
  Promise.all(promises).then((mockup) => {
    newState.mockup = mockup;
    this.setState(newState, () => {
      this.props.addOrder(this.state);
      this.props.toggleBuilder();
      this.toggle('waiting');
    });
  });
}
