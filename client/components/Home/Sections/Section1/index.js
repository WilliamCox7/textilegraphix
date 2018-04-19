import { React, Component, Link, MediaQuery } from '../../../../packages';
import { hoverDisplay, shirtModel } from '../../../../assets';
import './style.scss';

class Section1 extends Component {
  render() {
    return (
      <section className="Section1">
        <div className="wrapper flex jc-sb">
          <div className="hover-box flex">
            <div className="hover-display">
              <img src={hoverDisplay} />
              <MediaQuery maxWidth={650}>
                <Link to="products">
                  Get Started <i className="fas fa-arrow-right"></i>
                </Link>
              </MediaQuery>
            </div>
            <MediaQuery className="hover-box-buttons flex fd-c" minWidth={650}>
              <Link to="products">
                Get Started <i className="fas fa-arrow-right"></i>
              </Link>
              <Link to="support">
                Learn More <i className="fas fa-arrow-right"></i>
              </Link>
            </MediaQuery>
          </div>
          <MediaQuery minWidth={970}>
            <div>
              <img className="shirt-model" src={shirtModel} />
            </div>
          </MediaQuery>
        </div>
      </section>
    );
  }
}

export default Section1;
