import { React, Component, connect } from '../../packages';
import { setLocation } from '../../reducers/nav';
import { homeDisplay, blueArrow, grayArrow } from '../../assets';
import './HomeBox.scss';

class HomeBox extends Component {

  constructor() {
    super();
    this.state = {
      hoverStart: false,
      hoverLearn: false
    }
    this.setHover = this.setHover.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }

  setHover(type) {
    var key = "hover" + type;
    var newState = Object.assign({}, this.state);
    newState[key] = !this.state[key];
    this.setState(newState);
  }

  setLocation(loc) {
    var location = loc;
    this.props.setLocation(location);
  }

  render() {
    return (
      <div className="HomeBox">
        <img src={homeDisplay} />
        <div className="links">
          <a onMouseOver={() => {this.setHover("Start");}} href="/#/shop"
            onMouseOut={() => {this.setHover("Start");}} className="link"
            onClick={() => this.setLocation('shop')}>
            <h1>Get Started</h1>
            {this.state.hoverStart ? (
              <img src={blueArrow} />
            ) : (
              <img src={grayArrow} />
            )}
          </a>
          <a onMouseOver={() => {this.setHover("Learn");}} href="/#/about"
            onMouseOut={() => {this.setHover("Learn");}} className="link"
            onClick={() => this.setLocation('about')}>
            <h1>Learn More</h1>
            {this.state.hoverLearn ? (
              <img src={blueArrow} />
            ) : (
              <img src={grayArrow} />
            )}
          </a>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setLocation: setLocation
}

export default connect(null, mapDispatchToProps)(HomeBox);
