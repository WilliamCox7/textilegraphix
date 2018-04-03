import { React, Component, Link, connect } from '../../packages';
import { logoWhite, fb, insta } from '../../assets';
import './style.scss';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="wrapper flex ai-fe">
          <Link to="/" className="logo">
            <img src={logoWhite} />
          </Link>
          {this.props.window.w > 650 ? (
            <div>
              <a href="" target="_blank">
                <img className="social" src={fb} />
              </a>
              <a href="" target="_blank">
                <img className="social" src={insta} />
              </a>
            </div>
          ) : null}
          <p>Copyright 2018. Textile Graphix, LLC</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    window: state.window
  }
}

export default connect(mapStateToProps)(Footer);
