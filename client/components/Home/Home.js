import React, { Component } from 'react';
import HomeBox from '../HomeBox/HomeBox';
import HomeSection from '../HomeSection/HomeSection';
import OurReviews from '../OurReviews/OurReviews';
import fingerprint from '../../src/fingerprint.svg';
import box from '../../src/box.svg';
import lightning from '../../src/lightning.svg';
import service from '../../src/service.svg';
import drop from '../../src/drop.svg';
import ex from '../../src/ex.svg';
import cart from '../../src/cart.svg';
import './Home.scss';
import { Parallax, Background } from 'react-parallax';
import hat from '../../src/hat.png';
import tshirt2 from '../../src/tshirt2.png';
import polo from '../../src/polo.png';
import tshirt from '../../src/tshirt.png';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      width: document.body.clientWidth
    }
  }

  render() {
    return (
      <div className="Home">
        {this.state.width > 600 ? (
          <Parallax strength={300}>
            <HomeBox />
            <Background>
              <img className="tshirt" src={tshirt} />
            </Background>
            <HomeSection section={section1} image={hat} />
            <HomeSection section={section2} image={polo} />
            <HomeSection section={section3} image={tshirt2} />
            <OurReviews />
            <div className="contact-header">Contact Us</div>
          </Parallax>
        ) : (
          "Mobile"
        )}
      </div>
    );
  }
}

const section1 = {
  header: "What we bring to the table",
  icons: [
    { image: fingerprint, description: "Brand Identity" },
    { image: box, description: "Free Shipping" },
    { image: lightning, description: "Quick Turnaround" },
    { image: service, description: "Superior Customer Service" }
  ],
  prompt: "GET STARTED",
  taglines: [
    "We can help you decorate your apparel 100% to your brand",
    "Give us 10 business days and we will have your goods shipped!",
    "Don't ever worry about paying for shipping. We have you covered!",
    "Feel free to send us an email or give us a call. We are here to help."
  ],
  tagsize: 230,
  align: "center",
  iconWidth: 140
}

const section2 = {
  header: "What we can do",
  icons: [
    { image: drop, description: "Screen Printing" },
    { image: ex, description: "Embroidery" }
  ],
  prompt: "GET STARTED",
  taglines: [
    "Screen printing is by far the most economical way to print a shirt. BY using stenciled screens, squeegees are used to push ink through the screen and on to the garment. For larger print runs, screen printing is your best option for saving money and for providing a longer lasting product.",
    "Embroidery is most common on nicer garments used for more of a professional setting. By using thread, your logo is stitched into the garment, making it last for lightyears and beyond."
  ],
  tagsize: 300,
  align: "left",
  iconWidth: 140
}

const section3 = {
  header: "Explore our own products",
  icons: [
    { image: cart, description: "Check out our selection of original brands and T's" }
  ],
  prompt: "SHOW ME THE GOODS",
  taglines: [],
  tagsize: 0,
  align: "left",
  iconWidth: 500
}

export default Home;
