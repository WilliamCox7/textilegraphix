import { openModal } from './open-modal';

export function construct(Product) {
  Product.openModal = openModal.bind(Product);
}
