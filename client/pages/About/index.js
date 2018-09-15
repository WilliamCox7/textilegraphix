import React, { Component } from 'react';
import { setFooter, getAsset } from '../../modules';
import './style.scss';

class About extends Component {

  componentDidMount() {
    setFooter('MainFooter');
  }

  componentDidUpdate() {
    setFooter('MainFooter');
  }

  render() {
    return (
      <div id="About">
        <div className="img-wrapper">
          <img src={getAsset('grow-business', 'jpg')} />
        </div>
        <div className="flex jc-sb copy-wrapper">
          <div>
            <h2>About us.</h2>
          </div>
          <div>
            <h1>We grow businesses by creating experiences people love.</h1>
            <p>
              Today, people embrace companies with the customer experiences that best meet their needs.
              Huge transforms companies by desiging these best-in-class experiences, driven by strong
              creative and rooted in the technology, data, and organizational strategy required for operational
              excellence. We combine these capabilities into a single solution, creating unified brand experiences
              that change industries and foster meaninful relationships with users. This user-centric approach
              has made us the fastest-growing agency of the past decade.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
