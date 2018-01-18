import { Component, connect } from '../../packages';
import { template, construct, mapStateToProps, componentDidMount } from './modules';
import './Submit.scss';

class Submit extends Component {

  constructor() {
    super();
    construct(this);
  }

  componentDidMount() {
    componentDidMount(this);
  }

  render() {
    return template(this);
  }

}

export default connect(mapStateToProps)(Submit);
