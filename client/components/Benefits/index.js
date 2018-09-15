import React, { Component } from 'react';
import { getAsset } from '../../modules';
import './style.scss';

import BenefitTile from './BenefitTile';

class Benefits extends Component {
  render() {
    return (
      <section className="Benefits">
        <div className="body-wrapper">
          <div className="tiles flex jc-sb fw-w">
            <BenefitTile asset="fingerprint" h1="Full Brand Identity" p={`
              Don’t like the labels that come with the shirts? Dont worry, we
              will clip and replace them with your brand!
            `} />
            <BenefitTile asset="box" h1="Free Shipping" p={`
              99% of the time shipping will always be on us!
            `} />
            <BenefitTile asset="lightning" h1="Quick Turnaround" p={`
              Orders are fullfilled within 7-10 business days unless you
              need it quicker, we can help with that as well!
            `} />
            <BenefitTile asset="support" h1="Superior Support" p={`
              Our Account Managers are patiently waiting to help you
              with all your order needs.
            `} />
          </div>
        </div>
      </section>
    );
  }
}

export default Benefits;
