export default function updateCheckbox(e, form) {
  let newState = Object.assign({}, this.state);
  if (form) {
    if (!newState[form][e.target.name]) {
      newState[form] = Object.assign({}, newState[form], newState['billing']);
      newState[form][e.target.name] = true;
    } else {
      newState[form] = Object.assign({}, newState[form], {
        first: '',
        last: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        sameAsBilling: false
      });
    }
  } else {
    newState[e.target.name] = !newState[e.target.name];
  }
  this.setState(newState);
}
