import { React, Component } from '../../packages';
import { getAsset } from '../../modules';
import './style.scss';

class SocialMedia extends Component {
  render() {
    return (
      <div className={"SocialMedia flex " + (window.innerWidth > 755 ? "jc-sb" : "jc-c")}>
        <a href="https://www.facebook.com/textilegraphix/" target="_blank">
          <img className="social" src={getAsset(this.props.color === 'blue' ? 'fb-blue' : 'fb-white')} />
        </a>
        <a href="https://www.instagram.com/textilegraphix/" target="_blank">
          <img className="social" src={getAsset(this.props.color === 'blue' ? 'insta-blue' : 'insta-white')} />
        </a>
      </div>
    );
  }
}

export default SocialMedia;
