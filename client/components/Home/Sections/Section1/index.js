import { React, Component, Link, MediaQuery, Vimeo } from '../../../../packages';
import { letUs, articles, logosDesktop, logosMobile, shirtIconWhite, editWhite, clipboard } from '../../../../assets';
import './style.scss';

class Section1 extends Component {
  render() {
    return (
      <section className="Section1">
        <div className="body-wrapper flex jc-sb">

          {/* LEFT SIDE OF SECTION 1 */}
          <div className="hover-box flex">
            <div className="hover-display">
              <div className="image-sections">
                <div className="image-section">
                  <img src={letUs} />
                </div>
                <hr />
                <div className="image-section">
                  <img src={articles} />
                </div>
                <hr />
                <MediaQuery minWidth={650}>
                  <div className="image-section">
                    <img src={logosDesktop} />
                  </div>
                </MediaQuery>
                <MediaQuery maxWidth={650}>
                  <div className="image-section">
                    <img src={logosMobile} />
                  </div>
                </MediaQuery>
              </div>
              <MediaQuery maxWidth={700}>
                <Link to="products" className="fs-15 c-white">
                  Get Started <i className="fas fa-arrow-right"></i>
                </Link>
              </MediaQuery>
            </div>
            <MediaQuery className="hover-box-buttons flex fd-c" minWidth={700}>
              <Link to="products" className="fs-15 c-gray-1">
                Get Started <i className="fas fa-arrow-right fs-15"></i>
              </Link>
              <Link to="support" className="fs-15 c-gray-1">
                Learn More <i className="fas fa-arrow-right fs-15"></i>
              </Link>
            </MediaQuery>
          </div>

          {/* RIGHT SIDE OF SECTION 1 */}
          <MediaQuery className="video-steps" minWidth={1150}>
            <div className="vimeo-container">
              <Vimeo videoId="87902505" autoplay={true} />
            </div>
            <div className="steps-container flex jc-sb">
              <div className="step flex fd-c jc-c ai-c">
                <h1 className="fs-28 c-white">Step 1</h1>
                <img src={shirtIconWhite} />
                <h1 className="fs-10 c-white">SELECT PRODUCT</h1>
              </div>
              <div className="step flex fd-c jc-c ai-c">
                <h1 className="fs-28 c-white">Step 2</h1>
                <img src={editWhite} />
                <h1 className="fs-10 c-white">CUSTOMIZE ORDER</h1>
              </div>
              <div className="step flex fd-c jc-c ai-c">
                <h1 className="fs-28 c-white">Step 3</h1>
                <img src={clipboard} />
                <h1 className="fs-10 c-white">SUBMIT AND LET US DO THE REST</h1>
              </div>
            </div>
          </MediaQuery>
        </div>
      </section>
    );
  }
}

export default Section1;
