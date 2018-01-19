import { Component, connect } from '../../packages';
import { construct, template, mapDispatchToProps } from './modules';
import './Footer.scss';

class Footer extends Component {

  constructor() {
    super();
    construct(this);
  }

  render() {
    return template(this);
  }
  
}

export default connect(null, mapDispatchToProps)(Footer);
