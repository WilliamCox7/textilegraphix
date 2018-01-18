import { Component, connect } from '../../packages';
import { template, mapStateToProps, mapDispatchToProps, construct } from './modules';
import './SearchResults.scss';

class SearchResults extends Component {

  constructor() {
    super();
    construct(this);
  }

  render() {
    return template(this);
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
