import { domtoimage } from '../../../packages';

export default function addProductToCart() {
  this.toggle('waiting');
  let newState = Object.assign({}, this.state);
  newState.guid = createGuid();
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

function createGuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4();
}
