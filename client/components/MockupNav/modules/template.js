import { React } from '../../../packages';
import { lightGrayArrow } from '../../../assets';

export function template(MockupNav) {

  var curIndex = MockupNav.props.mockupnav.index;
  var prevIndex = curIndex - 1;
  var nextIndex = curIndex + 1;
  var length = MockupNav.props.mockupnav.length;

  return(
    <div className="MockupNav">
      <div className="title">
        {MockupNav.props.mockupnav.titles[curIndex]}
      </div>
      {length > 1 ? (
        <div className="circles">
          <img onClick={() => MockupNav.changeView(prevIndex, curIndex, length)} className="left-arrow" src={lightGrayArrow} />
          {MockupNav.props.circles}
          <img onClick={() => MockupNav.changeView(nextIndex, curIndex, length)} src={lightGrayArrow} />
        </div>
      ) : null}
    </div>
  );

}
