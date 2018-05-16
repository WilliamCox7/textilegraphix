import { React, Component, MediaQuery } from '../../packages';
import { Actions, SocialMedia } from '../';
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
          <SocialMedia color="blue" />
        </MediaQuery>
      </div>
    );
  }
}

export default Home;
