import { React } from '../../../packages';
import { upArrow, downArrow } from '../../../assets';

export function template(Summary) {
  return (
    <div className="Summary">
      {Summary.state.isActive ? (
        <img onClick={Summary.toggleArrow} src={upArrow} />
      ) : (
        <img onClick={Summary.toggleArrow} src={downArrow} />
      )}
      <div className="info">
        <h1 onClick={Summary.toggleArrow} >
          {Summary.props.summary.brand.toUpperCase()} {Summary.props.summary.number}
        </h1>
        {Summary.state.isActive ? (
          <div className="info-content">
            <div className="info-section">
              <div className="column1">
                <h2>Size</h2>
                <h3>XS</h3>
                <h3>SM</h3>
                <h3>M</h3>
                <h3>L</h3>
                <h3>XL</h3>
                <h3>2XL</h3>
                <h3>3XL</h3>
                <h3>4XL</h3>
              </div>
              <div className="column2">
                <h2>Quantity</h2>
                <h3>{format0s(Summary.props.summary.XS)}</h3>
                <h3>{format0s(Summary.props.summary.SM)}</h3>
                <h3>{format0s(Summary.props.summary.M)}</h3>
                <h3>{format0s(Summary.props.summary.L)}</h3>
                <h3>{format0s(Summary.props.summary.XL)}</h3>
                <h3>{format0s(Summary.props.summary.XL2)}</h3>
                <h3>{format0s(Summary.props.summary.XL3)}</h3>
                <h3>{format0s(Summary.props.summary.XL4)}</h3>
              </div>
            </div>
            <div className="info-section">
              <div className="column1">
                <h2>Colors</h2>
                <h3>Front</h3>
                <h3>Back</h3>
                <h3>Bottom</h3>
                <h3>Right Sleeve</h3>
                <h3>Left Sleeve</h3>
              </div>
              <div className="column2">
                <h2></h2>
                <h3>{Summary.props.summary.colorFront}</h3>
                <h3>{Summary.props.summary.colorBack}</h3>
                <h3>{Summary.props.summary.colorBottom}</h3>
                <h3>{Summary.props.summary.colorRightSleeve}</h3>
                <h3>{Summary.props.summary.colorLeftSleeve}</h3>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function format0s(value) {
  var zeroes = new Array(4).join("0");
  return (zeroes + value).slice(-3);
}
