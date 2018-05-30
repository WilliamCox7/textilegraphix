import { React, Component, Vimeo } from '../../../../packages';
import { getAsset } from '../../../../modules';
import './style.scss';

import StepTile from './StepTile';

class RightSide extends Component {
  render() {
    return (
      <div className="RightSide">
        <div className="vimeo-container">
          <Vimeo videoId="87902505" autoplay={true} />
        </div>
        <div className="steps-container flex jc-sb">
          <StepTile h1="Step 1" asset="shirt-icon-white" h2="SELECT PRODUCT" />
          <StepTile h1="Step 2" asset="edit-white" h2="CUSTOMIZE ORDER" />
          <StepTile h1="Step 3" asset="clipboard" h2="SUBMIT AND LET US DO THE REST" />
        </div>
      </div>
    );
  }
}

export default RightSide;
