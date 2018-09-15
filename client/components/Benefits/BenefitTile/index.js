import React, { Component } from 'react';
import { getAsset } from '../../../modules';
import SeparatorLine from '../../SeparatorLine';
import './style.scss';

class BenefitTile extends Component {
  render() {
    return (
      <div className="BenefitTile flex fd-c ai-c">
        <img src={getAsset(this.props.asset)} />
        <h1>{this.props.h1}</h1>
        <SeparatorLine />
        <p>{this.props.p}</p>
      </div>
    );
  }
}

export default BenefitTile;
