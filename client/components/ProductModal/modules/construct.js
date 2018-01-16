import { updateSize } from './update-size';
import { storeFile } from './store-file';
import { openLocal } from './open-local';
import { addToCart } from './add-to-cart';
import { downloadMockup } from './download-mockup';
import { setDelivery } from './set-delivery';

export function construct(ProductModal) {

  ProductModal.state = {
    delivery: '',
    XS: ProductModal.props.product.XS,
    SM: ProductModal.props.product.SM,
    M: ProductModal.props.product.M,
    L: ProductModal.props.product.L,
    XL: ProductModal.props.product.XL,
    XL2: ProductModal.props.product.XL2,
    XL3: ProductModal.props.product.XL3,
    XL4: ProductModal.props.product.XL4
  }

  ProductModal.updateSize = updateSize.bind(ProductModal);
  ProductModal.storeFile = storeFile.bind(ProductModal);
  ProductModal.openLocal = openLocal.bind(ProductModal);
  ProductModal.addToCart = addToCart.bind(ProductModal);
  ProductModal.downloadMockup = downloadMockup.bind(ProductModal);
  ProductModal.setDelivery = setDelivery.bind(ProductModal);

}
