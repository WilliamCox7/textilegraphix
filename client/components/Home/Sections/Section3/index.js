import { React, Component, Link, MediaQuery } from '../../../../packages';
import { graphixWheel } from '../../../../assets';
import './style.scss';

class Section3 extends Component {
  render() {
    return (
      <section className="Section3">
        <div className="body-wrapper flex jc-sb">
          <MediaQuery minWidth={980}>
            <img src={graphixWheel} />
          </MediaQuery>
          <div className="copy">
            <h1 className="fs-60 c-white">Screen Printing</h1>
            <MediaQuery minWidth={1200}>
              {(matches) => {
                if (matches) {
                  return (
                    <p className="fs-31 c-white">
                      Screen printing is by far the most economical way
                      to print a shirt. By using stenciled screens, squeegees
                      are used to push ink through the screen and
                      on to the garment. For larger print runs, screen
                      printing is your best option for saving money and
                      for providing a longer lasting product.
                    </p>
                  );
                } else {
                  return (
                    <p className="fs-31 c-white">
                      Screen printing is by far the most economical way
                      to print a shirt. By using stenciled screens, squeegees
                      are used to push ink through the screen and
                      on to the garment.
                    </p>
                  );
                }
              }}
            </MediaQuery>
            <Link to="products" className="fs-51 c-white">
              Quick Quote <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default Section3;
