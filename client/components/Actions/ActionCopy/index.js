import { React, Component } from '../../../packages';
import { SeparatorLine } from '../../';
import './style.scss';

class ActionCopy extends Component {
  render() {
    return (
      <div className="ActionCopy">
        <h1 id="h1-1" className="fs-45 c-black fw-bold">
          Any questions? Reach out to us!
        </h1>
        <SeparatorLine />
        <p id="p-1" className="fs-30 c-black">
          We like to keep things simple but if you have a
          question about any of our services, dont hesitate
          to ask.
        </p>
      </div>
    );
  }
}

export default ActionCopy;
