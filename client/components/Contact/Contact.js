import React, { Component } from 'react';
import contactHeader from '../../src/contact-header.svg';
import './Contact.scss';

class Contact extends Component {
  render() {
    return (
      <div className="Contact">
        <div className="content-wrapper">
          <div className="center-image">
            <img src={contactHeader} />
          </div>
          <div className="form">
            <div className="inputs">
              <input type="text" placeholder="Your name: (required)" />
              <input type="text" placeholder="Your email: (required)" />
              <textarea placeholder="Your message: (required)"></textarea>
            </div>
            <div className="info">
              <h2>Textile Graphix, LLC</h2>
              <h2>1154 Stocks Ave.<br />Rexburg, ID 83440</h2>
              <h2>Phone: 1(888) 440-2515<br />Email: Design@textilegraphix.com</h2>
              <button>submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
