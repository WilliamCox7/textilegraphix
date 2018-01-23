import { Component, connect } from '../../packages';
import { template, construct, componentDidMount, mapStateToProps, mapDispatchToProps } from './modules';
import './ProductModal.scss';

class ProductModal extends Component {

  constructor(props) {
    super(props);
    construct(this);
  }

  componentDidMount() {
    componentDidMount(this);
  }

  render() {
    return template(this);
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);
