import { React, Component } from '../../../packages';
import './style.scss';

class SearchResult extends Component {
  render() {
    return (
      <div className="SearchResult flex ai-c" onClick={() => this.props.setProduct(this.props.product)}>
        <span><img src={this.props.product.thumbnail} /></span>
        <h1 className="fs-18 c-gray-1">{this.props.product.brand} {this.props.product.number}</h1>
      </div>
    );
  }
}

export default SearchResult;
