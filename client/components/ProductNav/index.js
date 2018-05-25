import { React, Component } from '../../packages';
import { radioFilled, radioEmpty, hoodieThumb, tShirtThumb, sweaterThumb, longSleeveThumb } from '../../assets';
import './style.scss';

class ProductNav extends Component {

  constructor() {
    super();
    this.state = {
      tshirts: '',
      longsleeveshirt: '',
      hoodies: '',
      sweaters: ''
    }
    this.setFilter = this.setFilter.bind(this);
    this.setStatus = this.setStatus.bind(this);
  }

  setFilter(filter) {
    if (this.props.filter === filter) {
      filter = '';
    }
    this.props.setFilter(filter);
  }

  setStatus(filter, status) {
    var newState = Object.assign({}, this.state);
    if (status === 'hovering') {
      if (newState[filter] !== 'selected') {
        for (var prop in newState) {
          if (newState[prop] !== 'selected') {
            if (prop === filter) {
              newState[prop] = status;
            } else {
              newState[prop] = '';
            }
          }
        }
      }
    } else if (status === 'selected') {
      for (var prop in newState) {
        if (newState[prop] === 'selected') {
          newState[prop] = '';
        } else if (prop === filter) {
          newState[prop] = status;
        }
      }
    } else {
      if (newState[filter] !== 'selected') {
        newState[filter] = status;
      }
    }
    this.setState(newState);
  }

  render() {
    return (
      <div className="ProductNav">
        <div className="flex jc-sb ai-c" onClick={() => {this.setStatus('tshirts', 'selected'); this.setFilter('t-shirts');}}
          onMouseEnter={() => this.setStatus('tshirts', 'hovering')}
          onMouseLeave={() => this.setStatus('tshirts', '')}>
          <span className="flex ai-c">
            <img className="icon" src={tShirtThumb} />
            <h1 className="fs-22 c-blue fw-bold">T-SHIRTS</h1>
          </span>
          <img className="radio" src={this.state.tshirts === 'selected' ? (radioFilled)
            : (this.state.tshirts === 'hovering' ? (radioEmpty) : '//:0')}
            style={!this.state.tshirts ? {display: 'none'} : null} />
        </div>
        <div className="flex jc-sb ai-c" onClick={() => {this.setStatus('longsleeveshirt', 'selected'); this.setFilter('long sleeve shirt');}}
          onMouseEnter={() => this.setStatus('longsleeveshirt', 'hovering')}
          onMouseLeave={() => this.setStatus('longsleeveshirt', '')}>
          <span className="flex ai-c">
            <img className="icon" src={longSleeveThumb} />
            <h1 className="fs-22 c-blue fw-bold">LONG SLEEVE</h1>
          </span>
          <img className="radio" src={this.state.longsleeveshirt === 'selected' ? (radioFilled)
            : (this.state.longsleeveshirt === 'hovering' ? (radioEmpty) : '//:0')}
            style={!this.state.longsleeveshirt ? {display: 'none'} : null}  />
        </div>
        <div className="flex jc-sb ai-c" onClick={() => {this.setStatus('hoodies', 'selected'); this.setFilter('hoodies');}}
          onMouseEnter={() => this.setStatus('hoodies', 'hovering')}
          onMouseLeave={() => this.setStatus('hoodies', '')}>
          <span className="flex ai-c">
            <img className="icon" src={hoodieThumb} />
            <h1 className="fs-22 c-blue fw-bold">HOODIES</h1>
          </span>
          <img className="radio" src={this.state.hoodies === 'selected' ? (radioFilled)
            : (this.state.hoodies === 'hovering' ? (radioEmpty) : '//:0')}
            style={!this.state.hoodies ? {display: 'none'} : null}  />
        </div>
        <div className="flex jc-sb ai-c" onClick={() => {this.setStatus('sweaters', 'selected'); this.setFilter('sweaters');}}
          onMouseEnter={() => this.setStatus('sweaters', 'hovering')}
          onMouseLeave={() => this.setStatus('sweaters', '')}>
          <span className="flex ai-c">
            <img className="icon" src={sweaterThumb} />
            <h1 className="fs-22 c-blue fw-bold">SWEATERS</h1>
          </span>
          <img className="radio" src={this.state.sweaters === 'selected' ? (radioFilled)
            : (this.state.sweaters === 'hovering' ? (radioEmpty) : '//:0')}
            style={!this.state.sweaters ? {display: 'none'} : null}  />
        </div>
      </div>
    );
  }
}

export default ProductNav;
