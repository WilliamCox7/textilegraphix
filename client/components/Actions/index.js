import { React, Component, Link, MediaQuery } from '../../packages';
import { getAsset } from '../../modules';
import ActionCopy from './ActionCopy';
import './style.scss';

class Actions extends Component {
  render() {
    return (
      <section className="Actions" style={this.props.showCopy ? null : {"marginTop": "-50px"}}>
        <div className="body-wrapper" style={this.props.showCopy ? {"padding": "40px 0px 0px"} : null}>

          <MediaQuery minWidth={this.props.showCopy ? 0 : 650}>
            <ActionCopy />
          </MediaQuery>

          <div className="tiles flex jc-sb fw-w">
            <a className="tile flex fd-c jc-sb ai-c" href="tel:18884402515">
              <img src={getAsset('phone')} />
              <h1 className="fs-25 c-black">CALL US</h1>
              <p className="fs-16 c-black">+1 (888) 440 - 2515</p>
            </a>
            <a href="javascript:$zopim.livechat.window.show();" className="tile flex fd-c jc-sb ai-c">
              <img src={getAsset('chat')} />
              <h1 className="fs-25 c-black"></h1>
              <button>
                Live Chat <i className="fas fa-arrow-right"></i>
              </button>
            </a>
            <a className="tile flex fd-c jc-sb ai-c" target="_blank"
            href="https://maps.google.com/?q=1154 Stocks Ave. Rexburg ID, 83440">
              <img src={getAsset('location')} />
              <h1 className="fs-25 c-black">ADDRESS</h1>
              <p className="fs-16 c-black" >1154 Stocks Ave. Rexburg ID, 83440</p>
            </a>
            <a className="tile flex fd-c jc-sb ai-c" href="mailto:design@textilegraphix.com">
              <img src={getAsset('email')} />
              <h1 className="fs-25 c-black">EMAIL</h1>
              <p className="fs-16 c-black">Design@TextileGraphix.com</p>
            </a>
          </div>

        </div>
      </section>
    );
  }
}

export default Actions;
