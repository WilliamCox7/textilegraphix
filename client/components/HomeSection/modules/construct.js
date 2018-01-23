import { setHover } from './set-hover';
import { setLocation } from '../../_shared_modules';

export function construct(HomeSection) {

  HomeSection.state = {
    link: false
  }

  HomeSection.setHover = setHover.bind(HomeSection);
  HomeSection.setLocation = setLocation.bind(HomeSection);
  
}
