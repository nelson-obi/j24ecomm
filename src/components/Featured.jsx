import React, { useContext } from "react";
import ProductItems from "./ProductItems";
import EcomContext from "../context/EcomContext";
import { Carousel } from "flowbite-react";

function Featured() {
  const { featured } = useContext(EcomContext);
  return (
    <div>
      <div className="h-full">
        <h3>Featured</h3>
        <Carousel>
          {featured.map((items, index) => (
            <ProductItems key={index} productitems_prop={items} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Featured;
