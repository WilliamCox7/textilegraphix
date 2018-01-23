import { React } from '../../../packages';
import { PrintArea } from '../../index';
import { MockupNav } from '../../index';

export function template(Mockup) {

  var circles = [];

  var views = Mockup.props.nav.mockupnav.views.map((view, i) => {
    circles.push(
      <span key={i} className={Mockup.props.nav.mockupnav.index === i ? "circle active" : "circle"}></span>
    );
    return (
      <div className="view" key={i} style={{backgroundImage: 'url('+Mockup.props.product.images[view]+')'}}>
        <PrintArea edit={Mockup.props.edit} />
      </div>
    );
  });

  return (
    <div className="Mockup">
      <MockupNav mockupnav={Mockup.props.nav.mockupnav} circles={circles} />
      <div className="views" id="view-container" style={{"width": Mockup.props.nav.mockupnav.length * 326 + "px"}}>
        {views}
      </div>
    </div>
  );
}
