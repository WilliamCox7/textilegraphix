import { React, Component, Parallax, Background } from '../../packages';
import { Section1, Section2, Section3, Section4, Section5 } from './Sections';
import './style.scss';

class Home extends Component {
  render() {
    return (
      <Parallax strength={300} className="Home">
        <Background>
          <Section1 />
        </Background>
        <Section2 />
        <Section3 />
        <Background>
          <Section4 />
          <Section5 />
        </Background>
      </Parallax>
    );
  }
}

export default Home;
