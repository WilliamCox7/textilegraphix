import { React, Component, Parallax, Background, MediaQuery } from '../../packages';
import { Actions } from '../';
import { Section1, Section2, Section3, Section4, Section5 } from './Sections';
import { fbBlue, instaBlue } from '../../assets';
import './style.scss';

class Home extends Component {
  render() {
    return (
      <MediaQuery className minWidth={755}>
        {(matches) => {
          if (matches) {
            return (
              <Parallax strength={300} className="Home">
                <Background>
                  <Section1 />
                </Background>
                <Section2 />
                <Section3 />
                <Background>
                  <Section4 />
                  <Actions />
                </Background>
              </Parallax>
            );
          } else {
            return (
              <div className="Home">
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
                <Actions />
                <div className="social-home flex jc-sb">
                  <a href="" target="_blank">
                    <img className="social" src={fbBlue} />
                  </a>
                  <a href="" target="_blank">
                    <img className="social" src={instaBlue} />
                  </a>
                </div>
              </div>
            );
          }
        }}
      </MediaQuery>
    );
  }
}

export default Home;
