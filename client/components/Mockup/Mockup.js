import { React, Component, connect } from '../../packages';
import { PrintArea, MockupNav } from '../components';
import './Mockup.scss';

class Mockup extends Component {
  render() {

    var circles = [];

    var views = this.props.nav.mockup.views.map((view, i) => {
      circles.push(
        <span key={i} className={this.props.nav.mockup.index === i ? "circle active" : "circle"}></span>
      );
      return (
        <div className="view" key={i} style={{backgroundImage: 'url('+this.props.product.images[view]+')'}}>
          <PrintArea edit={this.props.edit} view={view} />
        </div>
      );
    });

    return (
      <div className="Mockup">
        <MockupNav mockup={this.props.nav.mockup} circles={circles} />
        <div className="views" id="view-container" style={{"width": this.props.nav.mockup.length * 326 + "px"}}>
          {views}
        </div>
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    nav: state.nav,
    modal: state.modal
  }
}

export default connect(mapStateToProps)(Mockup);
