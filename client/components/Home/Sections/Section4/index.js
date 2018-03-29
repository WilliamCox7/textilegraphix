import { React, Component, Link } from '../../../../packages';
import { box, fingerprint, lightning, support, blackShirtsZoom, blackShirtsFolded } from '../../../../assets';

class Section4 extends Component {
  render() {
    return (
      <section className="Section4">
        <div className="wrapper">
          <div className="tiles flex jc-sb">
            <div className="tile">
              <img src={fingerprint} />
              <h1>Full Brand Identity</h1>
              <div className="seperator-line"><div className="black-circle"></div></div>
              <p>
                Don’t like the labels that come
                with the shirts? Dont worry, we
                will clip and replace them
                with your brand!
              </p>
            </div>
            <div className="tile">
              <img src={box} />
              <h1>Free Shipping</h1>
              <div className="seperator-line"><div className="black-circle"></div></div>
              <p>
                99% of the time shipping will
                always be on us!
              </p>
            </div>
            <div className="tile">
              <img src={lightning} />
              <h1>Quick Turnaround</h1>
              <div className="seperator-line"><div className="black-circle"></div></div>
              <p>
                Orders are fullfilled within
                7-10 business days unless you
                need it quicker, we can help with
                that as well!
              </p>
            </div>
            <div className="tile">
              <img src={support} />
              <h1>Superior Support</h1>
              <div className="seperator-line"><div className="black-circle"></div></div>
              <p>
                Our Account Managers are
                patiently waiting to help you
                with all your order needs.
              </p>
            </div>
          </div>
          <div className="t-shirts flex jc-sb">
            <div>
              <img src={blackShirtsZoom} />
            </div>
            <div>
              <img src={blackShirtsFolded} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Section4;
