import { React, Component, Link } from '../../../../packages';
import { graphixWheel } from '../../../../assets';
import { showAt } from '../../../modules';
import './style.scss';

class Section3 extends Component {
  render() {
    return (
      <section className="Section3">
        <div className="wrapper flex jc-sb">
          <img src={graphixWheel} style={showAt(980, this.props.w)} />
          <div className="copy">
            <h1>Screen Printing</h1>
            {this.props.w > 980 ? (
              <p>
                Screen printing is by far the most economical way
                to print a shirt. By using stenciled screens, squeegees
                are used to push ink through the screen and
                on to the garment. For larger print runs, screen
                printing is your best option for saving money and
                for providing a longer lasting product.
              </p>
            ) : (
              <p>
                Screen printing is by far the most economical way
                to print a shirt. By using stenciled screens, squeegees
                are used to push ink through the screen and
                on to the garment.
              </p>
            )}
            <Link to="products">
              Quick Quote <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default Section3;
