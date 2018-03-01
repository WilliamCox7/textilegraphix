import { React, Component, connect } from '../../packages';
import { setLocation } from '../../reducers/nav';
import { logoBlue, facebook, instagram, copyright } from '../../assets';
import './Footer.scss';

class Footer extends Component {

  constructor() {
    super();
    this.setLocation = this.setLocation.bind(this);
  }

  setLocation(e) {
    var location = e.target.innerText.toLowerCase();
    this.props.setLocation(location);
  }

  render() {
    return (
      <div className="Footer">
        <div className="content">
          <div className="left">
            <a href="/#/" onClick={this.setLocation}>
              <img src={logoBlue} />
            </a>
            <div className="social-media">
              <img src={facebook} />
              <img src={instagram} />
            </div>
            <img src={copyright} />
          </div>
          <div className="right">
            <span></span>
            <a href="/#/contact" onClick={this.setLocation}>CONTACT</a>
            {/* <a href="/#/about" onClick={this.setLocation}>ABOUT</a> */}
            <a href="/#/shop" onClick={this.setLocation}>SHOP</a>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setLocation: setLocation
}

export default connect(null, mapDispatchToProps)(Footer);
