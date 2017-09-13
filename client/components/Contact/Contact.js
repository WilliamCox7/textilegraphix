import React, { Component } from 'react';
import './Contact.scss';

class Contact extends Component {

  constructor() {
    super();
    this.state = {
      width: document.body.clientWidth
    }
  }

  render() {
    return (
      <div className="Contact">
        {this.state.width > 600 ? (
          "Desktop"
        ) : (
          "Mobile"
        )}
      </div>
    );
  }
}

export default Contact;
