import { React, Component, MediaQuery } from '../../packages';
import { Actions, SocialMedia } from '../../components';
import { HomeSection1, HomeSection2, HomeSection3, HomeSection4, HomeSection5 } from '../../components/HomeSections';
import './style.scss';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <HomeSection1 />
        <HomeSection2 />
        <HomeSection3 />
        <HomeSection4 />
        <Actions />
        <MediaQuery maxWidth={755}>
          <SocialMedia color="blue" />
        </MediaQuery>
      </div>
    );
  }
}

export default Home;
