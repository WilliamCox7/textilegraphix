import { Component } from '../../packages';
import { construct, template } from './modules';
import './ShopNav.scss';

class ShopNav extends Component {

  constructor() {
    super();
    construct(this);
  }

  render() {
    return template(this);
  }

}

export default ShopNav;
