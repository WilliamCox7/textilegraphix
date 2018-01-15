import { React } from '../../../packages';
import { logoBlue, facebook, instagram, copyright } from '../../../assets';

export function template(Footer) {
  return (
    <div className="Footer">
      <div className="content">
        <div className="left">
          <a href="/#/" onClick={Footer.setLocation}>
            <img src={logoBlue} />
          </a>
          <div className="social-media">
            <img src={facebook} />
            <img src={instagram} />
          </div>
          <img src={copyright} />
        </div>
        <div className="right">
          <a href="/#/contact" onClick={Footer.setLocation}>CONTACT</a>
          <a href="/#/about" onClick={Footer.setLocation}>ABOUT</a>
          <a href="/#/shop" onClick={Footer.setLocation}>SHOP</a>
        </div>
      </div>
    </div>
  );
}
