import { Component, connect } from '../../packages';
import { template, construct, mapDispatchToProps } from './modules';
import './HomeSection.scss';

class HomeSection extends Component {

  constructor() {
    super();
    construct(this);
  }

  render() {
    return template(this);
  }
  
}

export default connect(null, mapDispatchToProps)(HomeSection);
