import React, { Component } from 'react';
import { getAsset, scrollToTop } from '../../modules';
import MainFooter from '../../components/MainFooter';
import './style.scss';

class About extends Component {

  componentDidMount() {
    scrollToTop();
  }

  render() {
    return (
      <div id="About">
        <div id="about-wrapper">
          <div className="img-wrapper">
            <img src={getAsset('grow-business', 'jpg')} />
          </div>
          <div className="flex jc-sb copy-wrapper">
            <div className="about-us">
              <h2>About us.</h2>
            </div>
            <div className="about-us-copy">
              <h1>We build brands by creating ideas and experiences that people will remember.</h1>
              <p>
                Today, people embrace companies with customer experiences that best meet their needs. 
                At Textile Graphix, we transform brands by creating these exact experiences with each 
                company that works with us. What drives us is our strong passion for creating a superior 
                product that will keep any company’s clientele or customer base coming back for more.  
                Our secret is that we care. We care to not only create an experience our customers will 
                remember but about that experience that our customers will create with their own clientele. 
                We are focused on putting all our skills and passions to good use by giving those who 
                we meet everything that we have to offer.
              </p>
            </div>
          </div>
        </div>
        <MainFooter />
      </div>
    );
  }
}

export default About;
