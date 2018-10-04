import html2canvas from 'html2canvas';

export default function addToCart() {
  this.toggle('waiting');
  let newState = Object.assign({}, this.state);
  console.log(newState);
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
}

function createGuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4();
}

function h2c(element) {
  return html2canvas(element, { useCORS: true, logging: false })
  .then((canvas) => canvas.toDataURL("image/jpeg"))
  .catch((err) => console.log(err));
}
