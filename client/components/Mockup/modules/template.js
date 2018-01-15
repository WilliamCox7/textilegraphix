import { React } from '../../../packages';
import { PrintArea } from '../../index';

export function template(Mockup) {
  return (
    <div className="Mockup" style={{backgroundImage: 'url('+Mockup.props.image+')'}}>
      <div className="view">

      </div>
      <PrintArea edit={Mockup.props.edit} />
    </div>
  );
}
