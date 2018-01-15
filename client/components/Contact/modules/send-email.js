import { axios } from '../../../packages';

export function sendEmail() {
  var newState = Object.assign({}, this.state);
  if (this.state.email.name) {
    if (this.state.email.from) {
      if (this.state.email.message) {
        axios.post('/sendemail', this.state.email).then((response) => {
          newState.email.name = '';
          newState.email.from = '';
          newState.email.message = '';
          newState.error = '';
          this.setState(newState);
        });
      } else {
        newState.error = 'Please include a message before sending...';
        this.setState(newState);
      }
    } else {
      newState.error = 'Please include your email before sending...';
      this.setState(newState);
    }
  } else {
    newState.error = 'Please include your name before sending...';
    this.setState(newState);
  }
}
