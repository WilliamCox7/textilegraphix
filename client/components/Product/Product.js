import { Component, connect } from '../../packages';
import { template, construct, mapDispatchToProps } from './modules';
import './Product.scss';

class Product extends Component {

  constructor() {
    super();
    construct(this);
  }

  render() {
    return template(this);
  }

}

export default connect(null, mapDispatchToProps)(Product);
