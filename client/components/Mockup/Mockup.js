import React, { Component } from 'react';
import PrintArea from '../PrintArea/PrintArea';
import './Mockup.scss';

class Mockup extends Component {
  render() {
    return (
      <div className="Mockup" style={{backgroundImage: 'url('+this.props.image+')'}}>
        <div className="view">

        </div>
        <PrintArea edit={this.props.edit} />
      </div>
    );
  }
}

export default Mockup;
