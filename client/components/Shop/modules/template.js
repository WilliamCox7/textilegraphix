import { React } from '../../../packages';
import { ShopNav, Product, ProductModal } from '../../index';

export function template(Shop) {
  var products = Shop.props.shop.products.map((product, i) => {
    if (!Shop.state.filter || product.type === Shop.state.filter) {
      return <Product product={product} key={i} />;
    }
  });

  return (
    <div className="Shop">
      {Shop.state.width > 600 ? (
        <div>
          <h1 className="header">Our Products</h1>
          <div className="products-container">
            <ShopNav setFilter={Shop.setFilter} filter={Shop.state.filter} />
            <div className="products">
              {products}
            </div>
          </div>
        </div>
      ) : (
        "Mobile"
      )}
      {Shop.props.modal.open ? <ProductModal /> : null}
    </div>
  );
}
