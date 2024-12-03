import React, { useContext } from "react";
import EcomContext from "../../context/EcomContext";
import ProductItems from "../ProductItems";

function Products() {
  const { product } = useContext(EcomContext);
  return (
    <div>
      <h4 className="text-center mt-5 mb-5 uppercase">Our Products</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center justify-center">
        {product.map((items) => (
          <ProductItems key={items.id} productitems_prop={items} />
        ))}
      </div>
    </div>
  );
}

export default Products;
