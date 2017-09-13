import React, { Component } from 'react';
import './QuoteBox.scss';

class QuoteBox extends Component {

  constructor() {
    super();
    this.state = {
      width: document.body.clientWidth
    }
  }

  render() {
    return (
      <div className="QuoteBox">
        {this.state.width > 600 ? (
          <h1 className="empty">There is nothing to see...</h1>
        ) : (
          "Mobile"
        )}
      </div>
    );
  }
}

export default QuoteBox;
