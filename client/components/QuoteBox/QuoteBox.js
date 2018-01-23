import { Component, connect } from '../../packages';
import { template, construct, mapStateToProps, mapDispatchToProps } from './modules';
import './QuoteBox.scss';

class QuoteBox extends Component {

  constructor() {
    super();
    construct(this);
  }

  render() {
    return template(this);
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(QuoteBox);
