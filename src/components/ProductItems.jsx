import React, { useContext } from 'react';
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import EcomContext from "../context/EcomContext"; // Import your context

function ProductItems({ productitems_prop }) {
    const { addToCart } = useContext(EcomContext); 

    const handleAddToCart = () => {    
        addToCart(productitems_prop.id, 1, productitems_prop);
    //   addToCart({ ...productitems_prop, quantity: 1 });
    };

    return (
        <Card className="max-w-sm p-0 m-0 border-none shadow-none">
            <div className="overflow-hidden">
                <img
                    src={productitems_prop.image} 
                    alt={`Product image of ${productitems_prop.name}`} 
                    className="w-full h-64 object-cover" 
                />
            </div>

            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {productitems_prop.name}
            </h5>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ${productitems_prop.price}
            </span>

            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={handleAddToCart} // Add product to cart on button click
                    className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                    Add to Cart
                </button>
                <Link
                    to={`/details/${productitems_prop.id}`}
                    className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                    View
                </Link>
            </div>
        </Card>
    );
}

export default ProductItems;
