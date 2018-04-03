import { React, Component, Link } from '../../../../packages';
import { hoverDisplay, shirtModel } from '../../../../assets';
import { showAt, hideAt } from '../../../modules';
import './style.scss';

class Section1 extends Component {
  render() {
    return (
      <section className="Section1">
        <div className="wrapper flex jc-sb">
          <div className="hover-box flex">
            <div className="hover-display">
              <hr style={hideAt(650, this.props.w)} />
              <img src={hoverDisplay} />
              {this.props.w <= 650 ? (
                <Link to="products">
                  Get Started <i className="fas fa-arrow-right"></i>
                </Link>
              ) : null}
            </div>
            <div className="hover-box-buttons flex fd-c" style={showAt(650, this.props.w)}>
              <Link to="products">
                Get Started <i className="fas fa-arrow-right"></i>
              </Link>
              <Link to="support">
                Learn More <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div style={showAt(970, this.props.w)}>
            <img className="shirt-model" src={shirtModel} />
          </div>
        </div>
      </section>
    );
  }
}

export default Section1;
