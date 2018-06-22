import { React, Component } from '../../packages';
import './style.scss';

const topStyle = {
  "borderTopLeftRadius": "8px",
  "borderTopRightRadius": "8px"
}

const bottomStyle = {
  "borderBottomLeftRadius": "8px",
  "borderBottomRightRadius": "8px"
}

class HelpHover extends Component {
  render() {
    return (
      <div className="HelpHover" id="help-hover" style={this.props.top ? topStyle : bottomStyle}
        onMouseEnter={this.props.cancelHelpTimer} onMouseLeave={this.props.fadeHelp}>
        {this.props.top ? (
          <div className="help-header flex jc-c ai-c" style={this.props.top ? topStyle : bottomStyle}>
            <h1 className="fs-15 fw-bold c-white">HELP</h1>
            <span className="fs-15 fw-bold c-blue flex jc-c ai-c">?</span>
          </div>
        ) : null}
        <div className="mid-section">
          <div className="mid-section-1 flex jc-sb ai-c">
            <h1 className="fs-8 fw-bold">DON'T HAVE A LOGO?</h1>
            <button className="fs-8 c-green" onClick={() => Intercom('show')}>
              CHAT NOW
            </button>
          </div>
          <hr />
          <div className="mid-section-2 fs-10">
            Send us a message via our Chat Box,
            explaining what you have in mind and our
            designers will get in contact with you.
            Typically if the design takes longer
            than 30 minutes to design, we charge
            $30/hr. Under 30 minutes, its free!
          </div>
        </div>
        {!this.props.top ? (
          <div className="help-header flex jc-c ai-c" style={this.props.top ? topStyle : bottomStyle}>
            <h1 className="fs-15 fw-bold c-white">HELP</h1>
            <span className="fs-15 fw-bold c-blue flex jc-c ai-c">?</span>
          </div>
        ) : null}
      </div>
    );
  }
}

export default HelpHover;
