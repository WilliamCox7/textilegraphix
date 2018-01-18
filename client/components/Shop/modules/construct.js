import { setFilter } from './set-filter';

export function construct(Shop) {

  Shop.state = {
    width: document.body.clientWidth,
    filter: ''
  }

  Shop.setFilter = setFilter.bind(Shop);

}
