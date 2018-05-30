import { React, Component, MediaQuery } from '../../../packages';
import './style.scss';

import LeftSide from './LeftSide';
import RightSide from './RightSide';

class HomeSection1 extends Component {
  render() {
    return (
      <section className="HomeSection1">
        <div className="body-wrapper flex jc-sb">
          <LeftSide />
          <MediaQuery minWidth={1150}>
            <RightSide />
          </MediaQuery>
        </div>
      </section>
    );
  }
}

export default HomeSection1;
