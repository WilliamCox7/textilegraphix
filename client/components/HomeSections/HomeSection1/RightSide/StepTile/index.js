import { React, Component } from '../../../../../packages';
import { getAsset } from '../../../../../modules';
import './style.scss';

class StepTile extends Component {
  render() {
    return (
      <div className="StepTile flex fd-c jc-c ai-c">
        <h1 className="fs-28 c-white">{this.props.h1}</h1>
        <img src={getAsset(this.props.asset)} />
        <h1 className="fs-10 c-white">{this.props.h2}</h1>
      </div>
    );
  }
}

export default StepTile;
