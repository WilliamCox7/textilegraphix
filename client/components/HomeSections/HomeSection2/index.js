import { React, Component } from '../../../packages';
import { getAsset } from '../../../modules';
import { SeparatorLine } from '../../';
import './style.scss';

class HomeSection2 extends Component {
  render() {
    return (
      <section className="HomeSection2">
        <div className="wrapper">
          <img src={getAsset('logo-black')} />
          <h1 className="fs-60 c-black">Our Bread and Butter</h1>
          <SeparatorLine />
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

export default HomeSection2;
