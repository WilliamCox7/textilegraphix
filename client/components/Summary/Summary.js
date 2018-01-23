import { Component } from '../../packages';
import { construct, template } from './modules';
import './Summary.scss';

class Summary extends Component {

  constructor() {
    super();
    construct(this);
  }

  render() {
    return template(this);
  }

}

export default Summary;
