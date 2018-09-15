import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SeparatorLine from '../../components/SeparatorLine';
import Benefits from '../../components/Benefits';
import Actions from '../../components/Actions';
import { setFooter, getAsset } from '../../modules';
import './style.scss';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      activeBanner: 1
    }
  }

  componentDidMount() {
    setFooter('HomeFooter');
    this.interval = setInterval(() => {
      let nextBanner = this.state.activeBanner + 1;
      if (nextBanner > 4) nextBanner = 1;
      this.setState({activeBanner: nextBanner});
    }, 4000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // componentDidUpdate() {
  //   setFooter('HomeFooter');
  // }

  render() {

    let classes = "vertical-banner flex fd-c ai-c jc-c";

    return (
      <div id="Home">
        <div id="banner-wrapper">
          <div className="flex banners">
            <div className={`${classes}${this.state.activeBanner === 1 ? ' active' : ''}`}>
              <div>
                <h1>SHIRTS</h1>
                <h2>T-Shirts</h2>
                <h2>Long Sleeve</h2>
                <h2>Tank Tops</h2>
                <h2>& more</h2>
                <Link to="/products">
                  <img src={getAsset('go-arrow')} />
                </Link>
              </div>
            </div>
            <div className={`${classes}${this.state.activeBanner === 2 ? ' active' : ''}`}>
              <div>
                <h1>OUTERWEAR</h1>
                <h2>Hoodies</h2>
                <h2>Sweaters</h2>
                <h2>Jackets</h2>
                <h2>& more</h2>
                <Link to="/products">
                  <img src={getAsset('go-arrow')} />
                </Link>
              </div>
            </div>
            <div className={`${classes}${this.state.activeBanner === 3 ? ' active' : ''}`}>
              <div>
                <h1>HEADWEAR</h1>
                <h2>Truckers</h2>
                <h2>Dad Hats</h2>
                <h2>Baseball Caps</h2>
                <h2>& more</h2>
                <Link to="/products">
                  <img src={getAsset('go-arrow')} />
                </Link>
              </div>
            </div>
            <div className={`${classes}${this.state.activeBanner === 4 ? ' active' : ''}`}>
              <div>
                <h1>PERFORMANCE</h1>
                <h2>Workout Wear</h2>
                <h2>Sports Wear</h2>
                <h2>Full Sublimation</h2>
                <h2>& more</h2>
                <Link to="/products">
                  <img src={getAsset('go-arrow')} />
                </Link>
              </div>
            </div>
            <div className="social-side flex fd-c ai-c jc-c">
              <a href="https://www.facebook.com/textilegraphix/" target="_blank">
                <img src={getAsset('fb-black')} />
              </a>
              <a href="https://www.instagram.com/textilegraphix/" target="_blank">
                <img src={getAsset('insta-black')} />
              </a>
            </div>
            <img id="scroll-down" src={getAsset('scroll-down')} />
          </div>
          <div id="section-2" className="flex">
            <div className="flex jc-c ai-c">
              <h1>HOW IT ALL WORKS</h1>
            </div>
            <div className="flex jc-c ai-c">
              <h1>VIDEO</h1>
            </div>
          </div>
          <div id="section-3">
            <div className="sec-3-header-wrapper">
              <h1>OUR WORK</h1>
              <SeparatorLine />
            </div>
            <div className="imgs-wrapper flex jc-sa">
              <div className="img-wrapper">
                <img src={getAsset('work-1', 'png')} />
              </div>
              <div className="img-wrapper">
                <img src={getAsset('work-2', 'png')} />
              </div>
              <div className="img-wrapper">
                <img src={getAsset('work-3', 'png')} />
              </div>
              <div className="img-wrapper">
                <img src={getAsset('work-4', 'png')} />
              </div>
            </div>
          </div>
          <Benefits />
          <Actions />
        </div>
        <div id="vertical-space"></div>
      </div>
    );
  }
}

export default Home;
