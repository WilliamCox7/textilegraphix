import { React, Component } from '../../packages';
import { Actions } from '../';
import './style.scss';

class Support extends Component {
  render() {
    return (
      <div className="Support">
        <h1 className="fs-40 c-blue fw-bold">
          Support
        </h1>
        <Actions showCopy />
      </div>
    );
  }
}

export default Support;
