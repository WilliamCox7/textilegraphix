import { Component, connect } from '../../packages';
import { template, mapStateToProps } from './modules';
import './Mockup.scss';

class Mockup extends Component {

  render() {
    return template(this);
  }

}

export default connect(mapStateToProps)(Mockup);
