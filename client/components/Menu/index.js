import { React, Component, Link } from '../../packages';
import { SocialMedia } from '../';
import { getAsset } from '../../modules';
import './style.scss';

class Menu extends Component {
  render() {
    return (
      <div className="Menu">
        <div className="close flex jc-fe ai-c">
          <h1 className="fs-36 c-blue">MENU</h1>
          <img onClick={() => {
            this.props.toggleMenu(); this.props.cancelBuilder();
          }} src={getAsset('close-x')} />
        </div>
        <div className="links flex jc-sa fd-c ai-c">
          <Link onClick={() => {
            this.props.toggleMenu(); this.props.cancelBuilder();
          }} to="/" className="fs-40 c-white">
            HOME
          </Link>
          <hr />
          <Link onClick={() => {
            this.props.toggleMenu(); this.props.cancelBuilder();
          }} to="products" className="fs-40 c-white">
            PRODUCTS
          </Link>
          <hr />
          <Link onClick={() => {
            this.props.toggleMenu(); this.props.cancelBuilder();
          }} to="support" className="fs-40 c-white">
            SUPPORT
          </Link>
          <hr />
          <SocialMedia color="white" />
        </div>
      </div>
    );
  }
}

export default Menu;
