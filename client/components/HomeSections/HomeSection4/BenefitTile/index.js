import { React, Component } from '../../../../packages';
import { getAsset } from '../../../../modules';
import { SeparatorLine } from '../../../';
import './style.scss';

class BenefitTile extends Component {
  render() {
    return (
      <div className="BenefitTile flex fd-c ai-c">
        <img src={getAsset(this.props.asset)} />
        <h1 className="fs-38 c-gray-1">{this.props.h1}</h1>
        <SeparatorLine />
        <p className="fs-21 c-gray-1">{this.props.p}</p>
      </div>
    );
  }
}

export default BenefitTile;
