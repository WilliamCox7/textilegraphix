import React, { Component } from 'react';
import Actions from '../../components/Actions';
import MainFooter from '../../components/MainFooter';
import { scrollToTop } from '../../modules';
import './style.scss';

class Support extends Component {

  componentDidMount() {
    scrollToTop();
  }

  render() {
    return (
      <div id="Support">
        <div className="blue-banner flex jc-c ai-c">
          <h1>WE'RE HERE TO HELP YOU!</h1>
        </div>
        <div id="top-space"></div>
        <Actions />
        <div id="bottom-space"></div>
        <MainFooter />
      </div>
    );
  }
}

export default Support;
