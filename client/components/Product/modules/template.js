import { React } from '../../../packages';

export function template(Product) {
  return (
    <div className="Product">
      <div className="image-container">
        <img src={Product.props.product.image} />
        <button onClick={() => Product.openModal(Product.props.product)}>
          Build Product
        </button>
      </div>
      <h1>{Product.props.product.brand.toUpperCase()}</h1>
      <h1>{Product.props.product.number}</h1>
    </div>
  );
}
