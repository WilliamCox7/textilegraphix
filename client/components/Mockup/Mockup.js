import { React, Component, connect } from '../../packages';
import { PrintArea, MockupNav } from '../components';
import './Mockup.scss';

class Mockup extends Component {
  render() {
    var circles = [];

    var views = this.props.product.mockup.views.map((view, i) => {
      circles.push(
        <span key={i} className={this.props.product.mockup.index === i ? "circle active" : "circle"}></span>
      );
      return (
        <div className="view" key={i} style={{backgroundImage: 'url('+this.props.product.images[view]+')'}}>
          <PrintArea product={this.props.product} edit={this.props.edit} view={view} />
        </div>
      );
    });

    return (
      <div className="Mockup">
        <MockupNav mockup={this.props.product.mockup} guid={this.props.product.guid} circles={circles} edit={this.props.edit} />
        <div className="views" id={this.props.product.guid} style={{"width": this.props.product.mockup.length * 326 + "px"}}>
          {views}
        </div>
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    nav: state.nav,
    cart: state.cart
  }
}

export default connect(mapStateToProps)(Mockup);
