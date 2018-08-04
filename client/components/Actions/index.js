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
          <ActionTile asset="phone" h="CALL US" p="+1 (888) 440 - 2515" href="tel:18884402515" />
          <ActionTile asset="chat" h="" button="Live Chat" click />
          <ActionTile asset="location" h="ADDRESS" p="1154 Stocks Ave. Rexburg ID, 83440"
            href="https://maps.google.com/?q=1154 Stocks Ave. Rexburg ID, 83440" target="_blank" />
          <ActionTile asset="email" h="EMAIL" p="Design@TextileGraphix.com"
            href="mailto:design@textilegraphix.com" />
        </div>
      </section>
    );
  }
}

export default Actions;
