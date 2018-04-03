import { React, Component } from '../../packages';
import { radioFilled, radioEmpty } from '../../assets';
import './style.scss';

class ProductNav extends Component {

  constructor() {
    super();
    this.state = {
      tshirts: '',
      longsleeveshirt: '',
      collaredshirt: '',
      hoodies: '',
      other: '',
      originals: ''
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
        <div className="flex jc-sb" onClick={() => {this.setStatus('tshirts', 'selected'); this.setFilter('t-shirts');}}
          onMouseEnter={() => this.setStatus('tshirts', 'hovering')}
          onMouseLeave={() => this.setStatus('tshirts', '')}>
          <h1>T-Shirts</h1>
          <img src={this.state.tshirts === 'selected' ? (radioFilled)
            : (this.state.tshirts === 'hovering' ? (radioEmpty) : '//:0')}
            style={!this.state.tshirts ? {display: 'none'} : null} />
        </div>
        <div className="flex jc-sb" onClick={() => {this.setStatus('longsleeveshirt', 'selected'); this.setFilter('long sleeve shirt');}}
          onMouseEnter={() => this.setStatus('longsleeveshirt', 'hovering')}
          onMouseLeave={() => this.setStatus('longsleeveshirt', '')}>
          <h1>Long Sleeve Shirt</h1>
          <img src={this.state.longsleeveshirt === 'selected' ? (radioFilled)
            : (this.state.longsleeveshirt === 'hovering' ? (radioEmpty) : '//:0')}
            style={!this.state.longsleeveshirt ? {display: 'none'} : null}  />
        </div>
        <div className="flex jc-sb" onClick={() => {this.setStatus('collaredshirt', 'selected'); this.setFilter('collared shirt');}}
          onMouseEnter={() => this.setStatus('collaredshirt', 'hovering')}
          onMouseLeave={() => this.setStatus('collaredshirt', '')}>
          <h1>Collared Shirt</h1>
          <img src={this.state.collaredshirt === 'selected' ? (radioFilled)
            : (this.state.collaredshirt === 'hovering' ? (radioEmpty) : '//:0')}
            style={!this.state.collaredshirt ? {display: 'none'} : null}  />
        </div>
        <div className="flex jc-sb" onClick={() => {this.setStatus('hoodies', 'selected'); this.setFilter('hoodies');}}
          onMouseEnter={() => this.setStatus('hoodies', 'hovering')}
          onMouseLeave={() => this.setStatus('hoodies', '')}>
          <h1>Hoodies</h1>
          <img src={this.state.hoodies === 'selected' ? (radioFilled)
            : (this.state.hoodies === 'hovering' ? (radioEmpty) : '//:0')}
            style={!this.state.hoodies ? {display: 'none'} : null}  />
        </div>
        <div className="flex jc-sb" onClick={() => {this.setStatus('other', 'selected'); this.setFilter('other');}}
          onMouseEnter={() => this.setStatus('other', 'hovering')}
          onMouseLeave={() => this.setStatus('other', '')}>
          <h1>Other</h1>
          <img src={this.state.other === 'selected' ? (radioFilled)
            : (this.state.other === 'hovering' ? (radioEmpty) : '//:0')}
            style={!this.state.other ? {display: 'none'} : null}  />
        </div>
        <div className="flex jc-sb" onClick={() => {this.setStatus('originals', 'selected'); this.setFilter('originals');}}
          onMouseEnter={() => this.setStatus('originals', 'hovering')}
          onMouseLeave={() => this.setStatus('originals', '')}>
          <h1>Originals</h1>
          <img src={this.state.originals === 'selected' ? (radioFilled)
            : (this.state.originals === 'hovering' ? (radioEmpty) : '//:0')}
            style={!this.state.originals ? {display: 'none'} : null}  />
        </div>
      </div>
    );
  }
}

export default ProductNav;
