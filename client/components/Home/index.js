import { React, Component, Parallax, Background, connect } from '../../packages';
import { Section1, Section2, Section3, Section4, Section5 } from './Sections';
import { fbBlue, instaBlue } from '../../assets';
import './style.scss';

class Home extends Component {
  render() {
    return (
      this.props.window.w > 650 ? (
        <Parallax strength={300} className="Home">
          <Background>
            <Section1 w={this.props.window.w} />
          </Background>
          <Section2 />
          <Section3 w={this.props.window.w} />
          <Background>
            <Section4 w={this.props.window.w} />
            <Section5 w={this.props.window.w} />
          </Background>
        </Parallax>
      ) : (
        <div className="Home">
          <Section1 w={this.props.window.w} />
          <Section2 />
          <Section3 w={this.props.window.w} />
          <Section4 w={this.props.window.w} />
          <Section5 w={this.props.window.w} />
          <div className="social-home flex jc-sb">
            <a href="" target="_blank">
              <img className="social" src={fbBlue} />
            </a>
            <a href="" target="_blank">
              <img className="social" src={instaBlue} />
            </a>
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    window: state.window
  }
}

export default connect(mapStateToProps)(Home);
