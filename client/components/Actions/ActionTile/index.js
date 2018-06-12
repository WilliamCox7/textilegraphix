import { React, Component } from '../../../packages';
import { getAsset } from '../../../modules';
import './style.scss';

class ActionTile extends Component {
  render() {
    return (
      <a id="ActionTile" className="flex fd-c jc-sb ai-c" href={this.props.href} target={this.props.target} onClick={() => this.props.click ? Intercom('show') : null}>
        <img className="tile-asset" src={getAsset(this.props.asset)} />
        <h1 className="fs-25 c-black">{this.props.h}</h1>
        {this.props.p ? (
          <p className="fs-16 c-black">{this.props.p}</p>
        ) : (
          <button className="tile-button">{this.props.button} <i className="fas fa-arrow-right"></i></button>
        )}
      </a>
    );
  }
}

export default ActionTile;
