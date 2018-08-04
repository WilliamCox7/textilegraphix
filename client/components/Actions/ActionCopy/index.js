import React, { Component } from 'react';
import SeparatorLine from '../../SeparatorLine';
import './style.scss';

class ActionCopy extends Component {
  render() {
    return (
      <div className="ActionCopy">
        <h1>Any questions? Reach out to us!</h1>
        <SeparatorLine />
        <p>
          We like to keep things simple but if you have a
          question about any of our services, dont hesitate
          to ask.
        </p>
      </div>
    );
  }
}

export default ActionCopy;
