import { React } from '../../../packages';
import { homeDisplay, blueArrow, grayArrow } from '../../../assets';

export function template(HomeBox) {
  return (
    <div className="HomeBox">
      <img src={homeDisplay} />
      <div className="links">
        <a onMouseOver={() => {HomeBox.setHover("Start");}} href="/#/shop"
          onMouseOut={() => {HomeBox.setHover("Start");}} className="link"
          onClick={() => HomeBox.setLocation('shop')}>
          <h1>Get Started</h1>
          {HomeBox.state.hoverStart ? (
            <img src={blueArrow} />
          ) : (
            <img src={grayArrow} />
          )}
        </a>
        <a onMouseOver={() => {HomeBox.setHover("Learn");}} href="/#/about"
          onMouseOut={() => {HomeBox.setHover("Learn");}} className="link"
          onClick={() => HomeBox.setLocation('about')}>
          <h1>Learn More</h1>
          {HomeBox.state.hoverLearn ? (
            <img src={blueArrow} />
          ) : (
            <img src={grayArrow} />
          )}
        </a>
      </div>
    </div>
  );
}
