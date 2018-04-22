import { React, Component, MediaQuery } from '../../packages';
import { Actions } from '../';
import './style.scss';

class Support extends Component {
  render() {
    return (
      <div className="Support">
        <MediaQuery minWidth={650}>
          <h1 className="fs-40 c-blue fw-bold">
            Support
          </h1>
        </MediaQuery>
        <Actions showCopy />
      </div>
    );
  }
}

export default Support;
