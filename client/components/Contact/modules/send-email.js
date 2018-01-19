import { axios } from '../../../packages';
import { handleError } from '../../_shared_modules';

export function sendEmail() {
  var newState = Object.assign({}, this.state);
  if (this.state.email.name) {
    if (this.state.email.from) {
      if (this.state.email.message) {
        axios.post('/sendemail', this.state.email).then((response) => {
          if (response.status === 200) {
            newState.email.name = '';
            newState.email.from = '';
            newState.email.message = '';
            newState.error = '';
            this.setState(newState);
          } else {
            handleError({
              path: '/client/components/Contact/modules/send-email',
              response: response,
              subject: '/sendemail endpoint came back with an error (not 200 status)'
            });
          }
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
