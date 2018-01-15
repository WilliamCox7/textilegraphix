import { setHover } from './set-hover';
import { setLocation } from './set-location';

export function construct(HomeBox) {
  HomeBox.state = {
    hoverStart: false,
    hoverLearn: false
  }
  HomeBox.setHover = setHover.bind(HomeBox);
  HomeBox.setLocation = setLocation.bind(HomeBox);
}
