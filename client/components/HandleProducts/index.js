import { React, Component, axios, connect } from '../../packages';
import { set } from '../../reducers/products';
import * as method from './methods';

const API = 'https://api.ssactivewear.com/v2';

class HandleProducts extends Component {

  constructor() {
    super();
    this.mapProducts = this.mapProducts.bind(this);
  }

  componentDidMount() {
    let cached = localStorage.getItem("products");
    cached = JSON.parse(cached);
    if (cached) {
      this.props.set(cached);
    } else {
      axios.get('/products/ssaw')
      .then((response) => {
        let products = this.mapProducts(response.data);
        localStorage.setItem("products", JSON.stringify(products));
        this.props.set(products);
      });
    }
  }

  render() {
    return (
      <div></div>
    );
  }
}

HandleProducts.prototype.mapProducts = method.mapProducts;

const mapDispatchToProps = {
  set: set
}

export default connect(null, mapDispatchToProps)(HandleProducts);
