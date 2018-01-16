import { Component, connect } from '../../packages';
import { template, construct, componentDidMount, mapDispatchToProps, mapStateToProps } from './modules';
import './PrintArea.scss';

class PrintArea extends Component {

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

export default connect(mapStateToProps, mapDispatchToProps)(PrintArea);
