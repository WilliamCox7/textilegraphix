import { Component } from '../../packages';
import { construct, template } from './modules';
import './Contact.scss';

class Contact extends Component {

  constructor() {
    super();
    construct(this);
  }

  render() {
    return template(this);
  }
  
}

export default Contact;
