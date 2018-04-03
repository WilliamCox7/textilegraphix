import { React, Component, Link } from '../../packages';
import { phone, chat, location, email } from '../../assets';
import { showAt } from '../modules';
import './style.scss';

class Actions extends Component {
  render() {
    return (
      <section className="Actions">
        <div className="wrapper">
          <div className="copy" style={this.props.copy ? null : showAt(650, this.props.w)}>
            <h1>Any questions? Reach out to us!</h1>
            <div className="seperator-line"><div className="black-circle"></div></div>
            <p>
              We like to keep things simple but if you have a
              question about any of our services, dont hesitate
              to ask.
            </p>
          </div>
          <div className="tiles flex jc-sb fw-w">
            <a className="tile flex fd-c jc-sb ai-c" href="tel:18884402515">
              <img src={phone} />
              <h1>CALL US</h1>
              <p>+1 (888) 440 - 2515</p>
            </a>
            <a className="tile flex fd-c jc-sb ai-c">
              <img src={chat} />
              <h1></h1>
              <button>
                Live Chat <i className="fas fa-arrow-right"></i>
              </button>
            </a>
            <a className="tile flex fd-c jc-sb ai-c" target="_blank" href="https://maps.google.com/?q=1154 Stocks Ave. Rexburg ID, 83440">
              <img src={location} />
              <h1>ADDRESS</h1>
              <p className="small-text" >1154 Stocks Ave. Rexburg ID, 83440</p>
            </a>
            <a className="tile flex fd-c jc-sb ai-c" href="mailto:design@textilegraphix.com">
              <img src={email} />
              <h1>EMAIL</h1>
              <p className="small-text">Design@TextileGraphix.com</p>
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default Actions;
