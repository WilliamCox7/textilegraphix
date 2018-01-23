import { setLocation } from '../../_shared_modules';

export function construct(Footer) {
  Footer.setLocation = setLocation.bind(Footer);
}
