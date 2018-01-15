import { updName } from './upd-name';
import { updFrom } from './upd-from';
import { updMessage } from './upd-message';
import { sendEmail } from './send-email';

export function construct(Contact) {

  Contact.state = {
    email: {
      name: '',
      from: '',
      message: ''
    },
    error: ''
  }

  Contact.updName = updName.bind(Contact);
  Contact.updFrom = updFrom.bind(Contact);
  Contact.updMessage = updMessage.bind(Contact);
  Contact.sendEmail = sendEmail.bind(Contact);

}
