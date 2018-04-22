import { React, Component, Link, MediaQuery } from '../../../../packages';
import { box, fingerprint, lightning, support, blackShirtsZoom, blackShirtsFolded } from '../../../../assets';
import './style.scss';

class Section4 extends Component {
  render() {
    return (
      <section className="Section4">
        <div className="body-wrapper">
          <div className="tiles flex jc-sb fw-w">
            <div className="tile flex fd-c ai-c">
              <img src={fingerprint} />
              <h1 className="fs-38 c-gray-1">Full Brand Identity</h1>
              <div className="seperator-line"><div className="black-circle"></div></div>
              <p className="fs-21 c-gray-1">
                Don’t like the labels that come
                with the shirts? Dont worry, we
                will clip and replace them
                with your brand!
              </p>
            </div>
            <div className="tile flex fd-c ai-c">
              <img src={box} />
              <h1 className="fs-38 c-gray-1">Free Shipping</h1>
              <div className="seperator-line"><div className="black-circle"></div></div>
              <p className="fs-21 c-gray-1">
                99% of the time shipping will
                always be on us!
              </p>
            </div>
            <div className="tile flex fd-c ai-c">
              <img src={lightning} />
              <h1 className="fs-38 c-gray-1">Quick Turnaround</h1>
              <div className="seperator-line"><div className="black-circle"></div></div>
              <p className="fs-21 c-gray-1">
                Orders are fullfilled within
                7-10 business days unless you
                need it quicker, we can help with
                that as well!
              </p>
            </div>
            <div className="tile flex fd-c ai-c">
              <img src={support} />
              <h1 className="fs-38 c-gray-1">Superior Support</h1>
              <div className="seperator-line"><div className="black-circle"></div></div>
              <p className="fs-21 c-gray-1">
                Our Account Managers are
                patiently waiting to help you
                with all your order needs.
              </p>
            </div>
          </div>
          <MediaQuery className="t-shirts flex jc-sb" minWidth={650}>
            <div>
              <img src={blackShirtsZoom} />
            </div>
            <div>
              <img src={blackShirtsFolded} />
            </div>
          </MediaQuery>
        </div>
      </section>
    );
  }
}

export default Section4;
