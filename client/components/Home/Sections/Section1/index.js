import { React, Component, Link } from '../../../../packages';
import { hoverDisplay, shirtModel } from '../../../../assets';

class Section1 extends Component {
  render() {
    return (
      <section className="Section1">
        <div className="wrapper flex jc-sb">
          <div className="hover-box flex">
            <div>
              <img src={hoverDisplay} />
            </div>
            <div className="hover-box-buttons flex fd-c">
              <Link to="products">
                Get Started <i className="fas fa-arrow-right"></i>
              </Link>
              <Link to="support">
                Learn More <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
          <img className="shirt-model" src={shirtModel} />
        </div>
      </section>
    );
  }
}

export default Section1;
