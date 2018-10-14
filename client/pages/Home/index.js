import React, { Component } from 'react';
import { Link } from "react-router-dom";
import MediaQuery from 'react-responsive';
import SeparatorLine from '../../components/SeparatorLine';
import Benefits from '../../components/Benefits';
import Actions from '../../components/Actions';
import HomeFooter from '../../components/HomeFooter';
import { getAsset, scrollToTop } from '../../modules';
import './style.scss';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      activeBanner: 'blue-background',
      isPlaying: false,
      windowWidth: window.innerWidth
    }
    this.startOurWorkInterval = this.startOurWorkInterval.bind(this);
    this.startBannerIntervalMobile = this.startBannerIntervalMobile.bind(this);
    this.startBannerInterval = this.startBannerInterval.bind(this);
    this.handleIntervals = this.handleIntervals.bind(this);
    this.controlVideo = this.controlVideo.bind(this);
  }

  componentDidMount() {
    scrollToTop();
    if (window.innerWidth > 1240) this.startBannerInterval();
    else this.startBannerIntervalMobile();
    if (window.innerWidth <= 669) this.startOurWorkInterval();
    window.addEventListener('resize', this.handleIntervals);
  }

  componentWillUnmount() {
    if (this.bannerInterval !== undefined) {
      clearInterval(this.bannerInterval);
      this.bannerInterval = undefined;
    }
    if (this.bannerIntervalMobile !== undefined) {
      clearInterval(this.bannerIntervalMobile);
      this.bannerIntervalMobile = undefined;
    }
    if (this.ourWorkInterval !== undefined) {
      clearInterval(this.ourWorkInterval);
      this.ourWorkInterval = undefined;
    }
    window.removeEventListener('resize', this.handleIntervals);
  }

  handleIntervals() {
    if (window.innerWidth <= 669 && this.ourWorkInterval === undefined) {
      this.startOurWorkInterval();
    } else if (window.innerWidth > 669 && this.ourWorkInterval !== undefined) {
      clearInterval(this.ourWorkInterval);
      this.ourWorkInterval = undefined;
    }
    if (window.innerWidth > 1240 && this.bannerInterval === undefined) {
      this.startBannerInterval();
      if (this.bannerIntervalMobile !== undefined) {
        clearInterval(this.bannerIntervalMobile);
        this.bannerIntervalMobile = undefined;
      }
    } else if (window.innerWidth <= 1240 && this.bannerIntervalMobile === undefined) {
      this.startBannerIntervalMobile();
      if (this.bannerInterval !== undefined) {
        clearInterval(this.bannerInterval);
        this.bannerInterval = undefined;
      }
    }
    this.setState({windowWidth: window.innerWidth});
  }

  startBannerInterval() {
    this.bannerInterval = setInterval(() => {
      let nextBanner;
      if (this.state.activeBanner === 'blue-background') nextBanner = 'light-blue-background';
      if (this.state.activeBanner === 'light-blue-background') nextBanner = 'pink-background';
      if (this.state.activeBanner === 'pink-background') nextBanner = 'yellow-background';
      if (this.state.activeBanner === 'yellow-background') nextBanner = 'blue-background';
      this.setState({activeBanner: nextBanner});
    }, 4000);
  }

  startBannerIntervalMobile() {
    this.bannerIntervalMobile = setInterval(() => {
      let bannersWrapper = document.getElementById('banners-wrapper-mobile');
      let displayedBanner = bannersWrapper.firstChild;
      let clonedNode = displayedBanner.cloneNode(true);
      displayedBanner.style.marginRight = `-${window.innerWidth}px`;
      setTimeout(() => {
        bannersWrapper.append(clonedNode);
        displayedBanner.remove();
      }, 500);
    }, 4000);
  }

  startOurWorkInterval() {
    this.ourWorkInterval = setInterval(() => {
      let imgsWrapper = document.getElementById('imgs-wrapper');
      let displayedImage = imgsWrapper.firstChild;
      let clonedNode = displayedImage.cloneNode(true);
      displayedImage.style.marginRight = '-295px';
      setTimeout(() => {
        imgsWrapper.append(clonedNode);
        displayedImage.remove();
      }, 500);
    }, 4000);
  }

  controlVideo() {
    let newState = Object.assign({}, this.state);
    if (newState.isPlaying) {
      document.getElementById('graphix-video').pause();
    } else {
      document.getElementById('graphix-video').play();
    }
    newState.isPlaying = !newState.isPlaying;
    this.setState(newState);
  }

  render() {

    let classes = "vertical-banner flex fd-c ai-c jc-c";
    return (
      <div id="Home">
        <div id="banner-wrapper">
          <div className="flex">
            <MediaQuery maxWidth={1239}>
              <div id="banners-wrapper-mobile" className="flex">
                <div className={`blue-background ${classes}${this.state.activeBanner === 'blue-background' ? ' active' : ''}`}>
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
                  <img id="slide-image-1" src={getAsset('slide-image-1', 'png')} />
                </div>
                <div className={`light-blue-background ${classes}${this.state.activeBanner === 'light-blue-background' ? ' active' : ''}`}>
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
                  <img id="slide-image-2" src={getAsset('slide-image-2', 'png')} />
                </div>
                <div className={`pink-background ${classes}${this.state.activeBanner === 'pink-background' ? ' active' : ''}`}>
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
                  <img id="slide-image-3" src={getAsset('slide-image-3', 'png')} />
                </div>
                <div className={`yellow-background ${classes}${this.state.activeBanner === 'yellow-background' ? ' active' : ''}`}>
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
                  <img id="slide-image-4" src={getAsset('slide-image-4', 'png')} />
                </div>
              </div>
            </MediaQuery>
            <MediaQuery minWidth={1240}>
              <div id="banners-wrapper" className="flex">
                <div className={`blue-background ${classes}${this.state.activeBanner === 'blue-background' ? ' active' : ''}`}>
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
                  {this.state.activeBanner === 'blue-background' ? (
                    <img id="slide-image-1" src={getAsset('slide-image-1', 'png')} />
                  ) : null}
                </div>
                <div className={`light-blue-background ${classes}${this.state.activeBanner === 'light-blue-background' ? ' active' : ''}`}>
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
                  {this.state.activeBanner === 'light-blue-background' ? (
                    <img id="slide-image-2" src={getAsset('slide-image-2', 'png')} />
                  ) : null}
                </div>
                <div className={`pink-background ${classes}${this.state.activeBanner === 'pink-background' ? ' active' : ''}`}>
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
                  {this.state.activeBanner === 'pink-background' ? (
                    <img id="slide-image-3" src={getAsset('slide-image-3', 'png')} />
                  ) : null}
                </div>
                <div className={`yellow-background ${classes}${this.state.activeBanner === 'yellow-background' ? ' active' : ''}`}>
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
                  {this.state.activeBanner === 'yellow-background' ? (
                    <img id="slide-image-4" src={getAsset('slide-image-4', 'png')} />
                  ) : null}
                </div>
              </div>
            </MediaQuery>
            {this.state.windowWidth > 1240 ? (
              <div id="extra-buttons-wrapper">
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
            ) : null}
          </div>
          <div id="section-2" className="flex">
            <div className="flex jc-c ai-c">
              <h1>HOW IT ALL WORKS</h1>
            </div>
            <div className="flex jc-c ai-c" onClick={this.controlVideo}>
              <video id="graphix-video" poster={getAsset('logo-black-thumbnail')}>
                <source src={getAsset('Textile-Graphix-Ad', 'mp4')} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {!this.state.isPlaying ? (
                <button id="video-play-button"><i className="fas fa-play"></i></button>
              ) : null}
            </div>
          </div>
          <div id="section-3">
            <div className="sec-3-header-wrapper">
              <h1>OUR WORK</h1>
              <SeparatorLine />
            </div>
            <div id="imgs-wrapper" className="flex jc-sa fw-w">
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
          <HomeFooter />
        </div>
      </div>
    );
  }
}

export default Home;
