import { togglePickup } from './toggle-pickup';
import { update } from './update';
import { setDelivery } from './set-delivery';

export function construct(Submit) {

  Submit.state = {
    projectName: '',
    first: '',
    last: '',
    company: '',
    phone: '',
    email: '',
    confirm: '',
    companyName: '',
    attn: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    pickup: false,
    notes: '',
    delivery: ''
  }

  Submit.togglePickup = togglePickup.bind(Submit);
  Submit.update = update.bind(Submit);
  Submit.setDelivery = setDelivery.bind(Submit);

}
