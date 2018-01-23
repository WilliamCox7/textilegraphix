export function setStatus(filter, status) {
  var newState = Object.assign({}, this.state);
  if (status === 'hovering') {
    if (newState[filter] !== 'selected') {
      for (var prop in newState) {
        if (newState[prop] !== 'selected') {
          if (prop === filter) {
            newState[prop] = status;
          } else {
            newState[prop] = '';
          }
        }
      }
    }
  } else if (status === 'selected') {
    for (var prop in newState) {
      if (newState[prop] === 'selected') {
        newState[prop] = '';
      } else if (prop === filter) {
        newState[prop] = status;
      }
    }
  } else {
    if (newState[filter] !== 'selected') {
      newState[filter] = status;
    }
  }
  this.setState(newState);
}
