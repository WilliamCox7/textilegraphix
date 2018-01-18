import { setFilter } from './set-filter';
import { setStatus } from './set-status';

export function construct(ShopNav) {

  ShopNav.state = {
    tshirts: '',
    longsleeveshirt: '',
    collaredshirt: '',
    hoodies: '',
    other: '',
    originals: ''
  }

  ShopNav.setFilter = setFilter.bind(ShopNav);
  ShopNav.setStatus = setStatus.bind(ShopNav);

}
