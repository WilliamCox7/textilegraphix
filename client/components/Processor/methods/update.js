import formatCardNumber from './format-card-number';

export default function(e) {
  let value = e.target.value;
  let newState = Object.assign({}, this.state);
  if (e.target.name === 'number') {
    value = formatCardNumber(e.target.value, this.state.number);
  }
  newState[e.target.name] = value;
  this.setState(newState);
}
