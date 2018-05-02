import { React, Component, MediaQuery } from '../../packages';
import { Actions } from '../';
import { Section1, Section2, Section3, Section4, Section5 } from './Sections';
import { fbBlue, instaBlue } from '../../assets';
import './style.scss';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Actions />
        <MediaQuery maxWidth={755}>
          <div className="social-home flex jc-sb">
            <a href="" target="_blank">
              <img className="social" src={fbBlue} />
            </a>
            <a href="" target="_blank">
              <img className="social" src={instaBlue} />
            </a>
          </div>
        </MediaQuery>
      </div>
    );
  }
}

export default Home;
