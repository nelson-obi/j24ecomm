import { createContext, useState, useEffect, useContext } from "react";
import EcomData from "../data/EcomData";
import useAlert from "../hooks/useAlert";
import AuthContext from "./AuthContext";

const EcomContext = createContext();


export const EcomProvider = ({ children }) => {
    // const [product, setProduct] = useState(EcomData);
    const [product, setProduct] = useState([]);
    const [ cartItems, setCartItems ] = useState([]);
    const [cartCount, setCartCount] = useState(0); // cartcount state
    const { alertInfo, showAndHide } = useAlert();
    const [order, setOrder] = useState([]);
    const [state, dispatch ] = useContext(AuthContext)
    const isAuthenticated = state.accessToken !== null;
    console.log(order)

    const featured = product.filter(product => product.featured === true);
    const trending = product.filter(product => product.trending === true);
    console.log("cart",localStorage.getItem("cartItems"))

    useEffect(() => {
        fetchProduct()
    }, [])

    useEffect(() => {
      fetchCart()
    }, [cartItems])
 

    useEffect(() => {
        fetchCart()
        const cartcount = cartItems?.products?.reduce((acc, curr) => {
            return acc + curr.quantity
        }, 0)

        const count = cartcount ? cartcount : 0;
        setCartCount(count);
    }, [])

    // fetch products
    const fetchProduct = async () => {
        try{
            const response = await fetch("http://localhost:8000/api/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify()
            })
            const data = await response.json()
            if(!response.ok) {
                showAndHide("error", "Could not fetch product")
            }else{
                showAndHide("success", "Product Available")
                setProduct(data.data)
            }
        }catch(error) {
            console.log(error)
        }
    }

    // add to cart 
    const addToCart = async (productId, quantity, product) => {
    if (isAuthenticated) {
      // if authenticated
      try {
        const res = await fetch("http://localhost:8000/api/add-to-cart", {
          method: "POST",
          headers: {
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, quantity }), // pass the value of quantity and productId in the details
        });
        const data = await res.json();
        if (res.ok) {
          setCartItems(data.data); // add the data
          console.log(data.data);
          showAndHide("success", "You have successfully added item to cart");
        } else {
          showAndHide("error", "product was not added to cart");
        }
      } catch (error) {
        console.log(error);
      }
      // if authenticated done
    } else {
      // if unauthenticated
      const storedCart = JSON.parse(localStorage.getItem("cartItems")) || { products: [] };
      const itemIndex = storedCart.products.findIndex(
        (item) => item.product.id === productId
      );

      if (itemIndex >= 0) {
        storedCart.products[itemIndex].quantity += 1;
        storedCart.products[itemIndex].amount = product.price * storedCart.products[itemIndex].quantity;
      } else {
        storedCart.products.push({
          product,
          quantity: 1,
          amount: product.price * 1,
        });
        console.log(product);
      }
      localStorage.setItem("cartItems", JSON.stringify(storedCart));
      showAndHide("success", "Product added to cart successfully!");
      setCartItems(storedCart); 
    }
  };

   // fetch cart
   const fetchCart = async () => {
    if (isAuthenticated) {
      // authenticated
      const res = await fetch("http://localhost:8000/api/carts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
      });
      const data = await res.json();
      console.log("without", data)
      if (res.ok) {
        // console.log("with produtcs",data.data.products)
        console.log(cartItems)
        console.log(setCartItems(data))
        setCartItems(data); // change the operator both statement has to be true
      } else {
        showAndHide("error", "Could not get cart");
      }
      // authenticated done
    } else {
      // unauthenticated
      const localCart = localStorage.getItem("cartItems");
      console.log(localCart);
      if (localCart) {
        setCartItems(JSON.parse(localCart));
      } else {
        setCartItems([]); // Clear cart items if nothing is in local storage
      }
      // unauthenticated done
    }
  };

   // remove cart items
  const removeCartItems = async (productId) => {
    if (window.confirm("Are you sure you want to delete?..")) {
      if (isAuthenticated) {
        try {
          // authenticated
          const res = await fetch("http://localhost:8000/api/delete-cart-items", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "auth-token": `${localStorage.getItem("auth-token")}`,
            },
            body: JSON.stringify({ productId }),
          });
          const data = await res.json();
          if (res.ok) {
            showAndHide("success", "Product Successfully deleted from cart");
            setCartItems(data);
          }
        } catch (error) {
          console.log(error);
        }
        // authenticated done
      } else {
        // unauthenticated
        const storedCart = JSON.parse(localStorage.getItem("cartItems")) || {
          products: [],
        };
        const itemIndex = storedCart.products.findIndex(
          (item) => item.product.id === productId
        );

        if (itemIndex >= 0) {
          storedCart.products.splice(itemIndex, 1);
          localStorage.setItem("cartItems", JSON.stringify(storedCart));
          setCartItems(storedCart); // Update the state to reflect changes in local storage
          showAndHide("success", "Product removed from cart successfully!");
        } else {
          showAndHide("error", "Product not found in cart.");
        }
        // unauthenticated done
      }
    }
  };

    // updateCart Items 
    const updateCartItem = async (productId, quantity) => {
      const parsedQuantity = parseInt(quantity, 10);
    
      if (parsedQuantity < 0 || isNaN(parsedQuantity)) {
        showAndHide("error", "Quantity must be a positive number!");
        return;
      }
    
      if (isAuthenticated) {
        try {
          const res = await fetch("http://localhost:8000/api/update-cart-items", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": `${localStorage.getItem("auth-token")}`,
            },
            body: JSON.stringify({ productId, quantity: parsedQuantity }),
          });
    
          const data = await res.json();
          if (res.status === 200) {
            const existingItems = cartItems.products?.findIndex(
              (items) => items.product.id === productId
            );
    
            if (existingItems !== -1) {
              const itemsInCart = [...cartItems.products];
              const updatedCartItem = { ...itemsInCart[existingItems] };
              updatedCartItem.quantity = parsedQuantity;
              updatedCartItem.amount = updatedCartItem.product.price * parsedQuantity;
    
              // Remove item if quantity is 0
              if (parsedQuantity === 0) {
                itemsInCart.splice(existingItems, 1);
              } else {
                itemsInCart[existingItems] = updatedCartItem;
              }
    
              setCartItems({ ...cartItems, products: itemsInCart });
            }
          } else {
            showAndHide("error", "Could not update cart");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        const storedCart = JSON.parse(localStorage.getItem("cartItems")) || {
          products: [],
        };
    
        const itemIndex = storedCart.products.findIndex(
          (item) => item.product.id === productId
        );
    
        if (itemIndex >= 0) {
          if (parsedQuantity === 0) {
            // Remove item if quantity is 0
            storedCart.products.splice(itemIndex, 1);
          } else {
            // Update quantity of item
            storedCart.products[itemIndex].quantity = parsedQuantity;
            storedCart.products[itemIndex].amount =
              storedCart.products[itemIndex].product.price * parsedQuantity;
          }
          localStorage.setItem("cartItems", JSON.stringify(storedCart));
          setCartItems(storedCart);
          showAndHide("success", "Cart updated successfully!");
        }
      }
    };
 
    // calculateTotalAmount
    const calcSubTotalAmount =() => {
        return cartItems?.products?.reduce((acc, curr) => acc + curr.amount, 0)
    }

    // calcvatAmount 
    const calcVatAmount = () => {
        const vat = calcSubTotalAmount() * 0.075;
        return vat
    }

    const calTotalAmount = () => {
        const vat = calcVatAmount()
        const subtotal = calcSubTotalAmount()
        return vat + subtotal
    }

    const createOrder = async (transaction_Id, orderId) => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/verify-payment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": `${localStorage.getItem("auth-token")}`,
            },
            body: JSON.stringify({ transaction_Id, orderId }),
          }
        );
        const data = await response.json();
        if (response.ok) { 
          showAndHide("success", data.message || "Order successful");
          setOrder(data.data);
        } else {
          setOrder([]);
          showAndHide("error", data.message || "Order failed");
        }
      } catch (error) {
        console.log(error);
      }
    };

    
    return (
      <EcomContext.Provider
        value={{
          product,
          featured,
          trending,
          alertInfo,
          cartItems,
          cartCount,
          showAndHide,
          isAuthenticated,
          setCartItems,
          fetchCart,

          addToCart,
          removeCartItems,
          updateCartItem,
          calcSubTotalAmount,
          calcVatAmount,
          calTotalAmount,
          createOrder,
          order,
        }}
      >
        {children}
      </EcomContext.Provider>
    );
}

export default EcomContext;








