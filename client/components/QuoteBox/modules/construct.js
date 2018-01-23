import { setLocation } from '../../_shared_modules';

export function construct(QuoteBox) {
  QuoteBox.setLocation = setLocation.bind(QuoteBox);
}
