import { setLocation } from './set-location';

export function construct(QuoteBox) {
  QuoteBox.setLocation = setLocation.bind(QuoteBox);
}
