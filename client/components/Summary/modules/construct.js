import { toggleArrow } from './toggle-arrow';

export function construct(Summary) {

  Summary.state = {
    isActive: false
  }

  Summary.toggleArrow = toggleArrow.bind(Summary);

}
