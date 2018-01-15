import { setLocation } from './set-location';

export function construct(Footer) {
  Footer.setLocation = setLocation.bind(Footer);
}
