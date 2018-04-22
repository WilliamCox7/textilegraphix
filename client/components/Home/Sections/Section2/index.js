import { React, Component } from '../../../../packages';
import { logoBlack } from '../../../../assets';
import './style.scss';

class Section2 extends Component {
  render() {
    return (
      <section className="Section2">
        <div className="wrapper">
          <img src={logoBlack} />
          <h1 className="fs-60 c-black">Our Bread and Butter</h1>
          <div className="seperator-line"><div className="black-circle"></div></div>
          <p className="fs-30 c-black">
            We are the pros and have perfected the
            process so that you get a perfect product
            everytime!
          </p>
        </div>
      </section>
    );
  }
}

export default Section2;
