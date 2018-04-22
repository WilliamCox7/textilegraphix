import { React, Component, connect, NumberFormat } from '../../packages';
import './style.scss';

class Order extends Component {
  render() {

    let items = this.props.cart.products.map((item) => {
      return (
        <div className="item flex ai-c jc-sb">
          <i className="fas fa-arrow-right"></i>
          <div className="sizes-card">
            <h1 className="darkgray-bold">{item.brand} {item.number}</h1>
            <h1 className="m-lightgray">{item.selectedColor} {item.number}</h1>
            <div className="sizes-price flex">
              <div className="sizes flex">
                <div className="size">
                  <input type="text" />
                  <h1 className="m-lightgray">XS</h1>
                </div>
                <div className="size">
                  <input type="text" />
                  <h1 className="m-lightgray">S</h1>
                </div>
                <div className="size">
                  <input type="text" />
                  <h1 className="m-lightgray">M</h1>
                </div>
                <div className="size">
                  <input type="text" />
                  <h1 className="m-lightgray">L</h1>
                </div>
                <div className="size">
                  <input type="text" />
                  <h1 className="m-lightgray">XL</h1>
                </div>
                <div className="size">
                  <input type="text" />
                  <h1 className="m-lightgray">2XL</h1>
                </div>
                <div className="size">
                  <input type="text" />
                  <h1 className="m-lightgray">3XL</h1>
                </div>
                <div className="size">
                  <input type="text" />
                  <h1 className="m-lightgray">4XL</h1>
                </div>
              </div>
              <div className="total">
                <h4>200</h4>
                <h5>TOTAL</h5>
              </div>
              <div className="price">
                <h4 className="blue-text"></h4>
                <h4 className="total">
                  <NumberFormat value={1700} displayType={'text'}
                    thousandSeparator={true} prefix={'$'} decimalScale={2} />
                </h4>
              </div>
            </div>
          </div>
        </div>
      );
    });



    return (
      <div className="Order">
        <h1 className="blue-text">Quote Submission Form</h1>
        <div className="side left">
          <input className="project-name" type="text" placeholder="Project Name" />
          <div className="items-in-cart">
            {items}
          </div>
        </div>
        <div className="side right">

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(Order);
