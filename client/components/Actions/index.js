import React, { Component } from 'react';
import './style.scss';

import ActionCopy from './ActionCopy';
import ActionTile from './ActionTile';

class Actions extends Component {
  render() {
    return (
      <section id="Actions">
        <ActionCopy />
        <div className="tiles flex jc-sb fw-w">
          <ActionTile asset="phone" h="CALL US" p="+1 (555) 555 - 5555" href="tel:15555555555" />
          <ActionTile asset="chat" h="" button="Live Chat" click />
          <ActionTile asset="location" h="ADDRESS" p="1154 Stocks Ave. Rexburg ID, 83440"
            href="https://maps.google.com/?q=1154 Stocks Ave. Rexburg ID, 83440" target="_blank" />
          <ActionTile asset="email" h="EMAIL" p="willcx30@gmail.com"
            href="mailto:willcx30@gmail.com" />
        </div>
      </section>
    );
  }
}

export default Actions;
