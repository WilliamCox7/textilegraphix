import React, { Component } from 'react';
import { contactHeader } from '../../assets';
import axios from 'axios';
import './Contact.scss';

class Contact extends Component {

  constructor() {
    super();
    this.state = {
      email: {
        name: '',
        from: '',
        message: ''
      },
      error: ''
    }
    this.updName = this.updName.bind(this);
    this.updFrom = this.updFrom.bind(this);
    this.updMessage = this.updMessage.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  updName(e) {
    var newState = Object.assign({}, this.state);
    newState.email.name = e.target.value;
    this.setState(newState);
  }

  updFrom(e) {
    var newState = Object.assign({}, this.state);
    newState.email.from = e.target.value;
    this.setState(newState);
  }

  updMessage(e) {
    var newState = Object.assign({}, this.state);
    newState.email.message = e.target.value;
    this.setState(newState);
  }

  sendEmail() {
    var newState = Object.assign({}, this.state);
    if (this.state.email.name) {
      if (this.state.email.from) {
        if (this.state.email.message) {
          axios.post('/sendemail', this.state.email).then((response) => {
            newState.email.name = '';
            newState.email.from = '';
            newState.email.message = '';
            newState.error = '';
            this.setState(newState);
          });
        } else {
          newState.error = 'Please include a message before sending...';
          this.setState(newState);
        }
      } else {
        newState.error = 'Please include your email before sending...';
        this.setState(newState);
      }
    } else {
      newState.error = 'Please include your name before sending...';
      this.setState(newState);
    }
  }

  render() {
    return (
      <div className="Contact">
        <div className="content-wrapper">
          <div className="center-image">
            <img src={contactHeader} />
          </div>
          <div className="form">
            <div className="inputs">
              <input type="text" placeholder="Your name: (required)"
                value={this.state.email.name} onChange={this.updName} />
              <input type="text" placeholder="Your email: (required)"
                value={this.state.email.from} onChange={this.updFrom} />
              <textarea placeholder="Your message: (required)"
                value={this.state.email.message} onChange={this.updMessage}></textarea>
            </div>
            <div className="info">
              <h2>Textile Graphix, LLC</h2>
              <h2>1154 Stocks Ave.<br />Rexburg, ID 83440</h2>
              <h2>Phone: 1(888) 440-2515<br />Email: Design@textilegraphix.com</h2>
              <button onClick={this.sendEmail}>submit</button>
              {this.state.error ? (<div className="error-message">{this.state.error}</div>) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
