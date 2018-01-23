import { React, Parallax, Background } from '../../../packages';
import { HomeBox, HomeSection, OurReviews } from '../../index';
import { section1, section2, section3 } from './sections';
import { hat, tshirt2, polo, tshirt } from '../../../assets';

export function template(Home) {
  return (
    <div className="Home">
      {Home.state.width > 600 ? (
        <Parallax strength={300}>
          <HomeBox />
          <Background>
            <img className="tshirt" src={tshirt} />
          </Background>
          <HomeSection section={section1} image={hat} />
          <HomeSection section={section2} image={polo} />
          <HomeSection section={section3} image={tshirt2} />
          <OurReviews />
          <div className="contact-header">Contact Us</div>
        </Parallax>
      ) : (
        "Mobile"
      )}
    </div>
  );
}
