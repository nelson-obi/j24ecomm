import React, { useContext } from "react";
import { Carousel } from "flowbite-react";
import ProductItems from "./ProductItems";
import EcomContext from "../context/EcomContext";

function Trending() {
  const { trending } = useContext(EcomContext);
  return (
    <div>
      <div className="h-full">
        <h3>Trending</h3>
        <Carousel>
          {trending.map((items, index) => (
            <ProductItems key={index} productitems_prop={items} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Trending;
