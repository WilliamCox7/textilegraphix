import { Component, connect } from '../../packages';
import { construct, template, mapStateToProps } from './modules';
import './Shop.scss';

class Shop extends Component {

  constructor() {
    super();
    construct(this);
  }

  render() {
    return template(this);
  }

}

export default connect(mapStateToProps)(Shop);
