import { React, Component, MediaQuery } from '../../packages';
import './style.scss';

import ActionCopy from './ActionCopy';
import ActionTile from './ActionTile';

class Actions extends Component {
  render() {
    return (
      <section className="Actions" style={this.props.showCopy ? null : {"marginTop": "-50px"}}>
        <div className="body-wrapper" style={this.props.showCopy ? {"padding": "40px 0px 0px"} : null}>

          <MediaQuery minWidth={this.props.showCopy ? 0 : 650}>
            <ActionCopy />
          </MediaQuery>

          <div className="tiles flex jc-sb fw-w">
            <ActionTile asset="phone" h="CALL US" p="+1 (888) 440 - 2515" href="tel:18884402515" />
            <ActionTile asset="chat" h="" button="Live Chat" href="javascript:$zopim.livechat.window.show();" />
            <ActionTile asset="location" h="ADDRESS" p="1154 Stocks Ave. Rexburg ID, 83440" href="https://maps.google.com/?q=1154 Stocks Ave. Rexburg ID, 83440" target="_blank" />
            <ActionTile asset="email" h="EMAIL" p="Design@TextileGraphix.com" href="mailto:design@textilegraphix.com" />
          </div>

        </div>
      </section>
    );
  }
}

export default Actions;
