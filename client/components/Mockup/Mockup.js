import { Component } from '../../packages';
import { template } from './modules';
import './Mockup.scss';

class Mockup extends Component {

  render() {
    return template(this);
  }
  
}

export default Mockup;
