import { setModal, addImage } from '../../../reducers/modal';
import { setColor, toggleType, updateSize, toggleLoc, dec, inc, resetProduct } from '../../../reducers/product';
import { add } from '../../../reducers/cart';

export const mapDispatchToProps = {
  setColor: setColor,
  toggleType: toggleType,
  updateSize: updateSize,
  toggleLoc: toggleLoc,
  dec: dec,
  inc: inc,
  setModal: setModal,
  resetProduct: resetProduct,
  addImage: addImage,
  add: add
}
