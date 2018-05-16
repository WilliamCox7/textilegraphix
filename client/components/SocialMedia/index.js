import { React, Component } from '../../packages';
import { fbBlue, instaBlue, fbWhite, instaWhite } from '../../assets';
import './style.scss';

class SocialMedia extends Component {
  render() {
    return (
      <div className={"SocialMedia flex " + (window.innerWidth > 755 ? "jc-sb" : "jc-c")}>
        <a href="https://www.facebook.com/textilegraphix/" target="_blank">
          <img className="social" src={this.props.color === 'blue' ? fbBlue : fbWhite} />
        </a>
        <a href="https://www.instagram.com/textilegraphix/" target="_blank">
          <img className="social" src={this.props.color === 'blue' ? instaBlue : instaWhite} />
        </a>
      </div>
    );
  }
}

export default SocialMedia;
