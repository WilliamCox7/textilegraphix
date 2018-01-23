import { setLocation } from '../../../reducers/nav';
import { setModal } from '../../../reducers/modal';
import { setProduct } from '../../../reducers/product';

export const mapDispatchToProps = {
  setModal: setModal,
  setProduct: setProduct,
  setLocation: setLocation
}
