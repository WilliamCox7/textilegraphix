import { Component, connect } from '../../packages';
import { construct, template, mapDispatchToProps } from './modules';
import './HomeBox.scss';

class HomeBox extends Component {

  constructor() {
    super();
    construct(this);
  }

  render() {
    return template(this);
  }
}

export default connect(null, mapDispatchToProps)(HomeBox);
