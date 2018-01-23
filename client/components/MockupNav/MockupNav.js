import { Component, connect } from '../../packages';
import { template, construct, mapDispatchToProps } from './modules';
import './MockupNav.scss';

class MockupNav extends Component {

  constructor() {
    super();
    construct(this);
  }

  render() {
    return template(this);
  }

}

export default connect(null, mapDispatchToProps)(MockupNav);
