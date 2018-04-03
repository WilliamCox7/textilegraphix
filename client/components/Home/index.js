import { React, Component, Parallax, Background, connect } from '../../packages';
import { Section1, Section2, Section3, Section4, Section5 } from './Sections';
import './style.scss';

class Home extends Component {
  render() {
    return (
      <Parallax strength={300} className="Home">
        <Background>
          <Section1 w={this.props.window.w} />
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

const mapStateToProps = (state) => {
  return {
    window: state.window
  }
}

export default connect(mapStateToProps)(Home);
