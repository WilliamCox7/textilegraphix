import { React, Component, connect } from '../../packages';
import { Actions } from '../';
import './style.scss';

class Support extends Component {
  render() {
    return (
      <div className="Support">
        <h1 className="header">
          Support
        </h1>
        <Actions w={this.props.window.w} copy={true} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    window: state.window
  }
}

export default connect(mapStateToProps)(Support);
