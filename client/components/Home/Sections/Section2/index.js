import { React, Component } from '../../../../packages';
import { logoBlack } from '../../../../assets';

class Section2 extends Component {
  render() {
    return (
      <section className="Section2">
        <div className="wrapper">
          <img src={logoBlack} />
          <h1>Our Bread and Butter</h1>
          <div className="seperator-line"><div className="black-circle"></div></div>
          <p>
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
