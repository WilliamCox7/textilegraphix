import { React, Component, MediaQuery, Link } from '../../../../packages';
import { getAsset } from '../../../../modules';
import './style.scss';

class LeftSide extends Component {
  render() {
    return (
      <div className="LeftSide flex">
        <div className="hover-display">
          <div className="image-sections">
            <div className="image-section">
              <img src={getAsset('let-us', 'png')} />
            </div>
            <hr />
            <div className="image-section">
              <img src={getAsset('articles', 'png')} />
            </div>
            <hr />
            <MediaQuery minWidth={650}>
              <div className="image-section">
                <img src={getAsset('logos-desktop', 'png')} />
              </div>
            </MediaQuery>
            <MediaQuery maxWidth={650}>
              <div className="image-section">
                <img src={getAsset('logos-mobile', 'png')} />
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
    );
  }
}

export default LeftSide;
