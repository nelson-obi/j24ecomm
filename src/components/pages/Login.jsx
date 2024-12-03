import React, { useContext, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import EcomContext from "../../context/EcomContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import AuthContext from "../../context/AuthContext";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, dispatch ]= useContext(AuthContext)
    const { showAndHide, isAuthenticated, setCartItems, fetchCart } = useContext(EcomContext);
    const { setItem, getItem, deleteItem } = useLocalStorage("auth-token");
    const redirect = useNavigate()

    if (isAuthenticated) {
      return <Navigate to="/" />
    }
    
    const loginHandler = async (e) => {
      e.preventDefault();
      if (!email || !password) {
        showAndHide("error", "Email and Passowrd is required")
        return;
      } 
      try {
        const res = await fetch("http://localhost:8000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          showAndHide("error", data.message);
          // data.email !== "Please pass ema"
        }else {
          dispatch({ type: "setToken", payload: data.token });
          setItem(data.token);
          const cartDataItem = JSON.parse(localStorage.getItem("cartItems"));
          if(cartDataItem){
            await Promise.all(cartDataItem?.products?.map(async (item) => {
              const response = await fetch("http://localhost:8000/api/add-to-cart", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem("auth-token"),  // Use the token directly
                },
                body: JSON.stringify({ productId: parseInt(item.product.id), quantity: item.quantity }),
              });

              const cartdata = await response.json();
              console.log( "todday", cartdata);
              if (res.ok) {
                setCartItems(cartdata.data);
                fetchCart();
                showAndHide("success", data.message)
              } else {
                console.error(`Failed to add items to the backend cart`);
              }
            }))
            localStorage.removeItem("cartItems");
          }
          redirect("/");
          showAndHide("success", data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div>
    <div className="h-full">
      <div className="m-auto mt-16 max-w-lg w-full rounded shadow-lg">
        <div className="grid grid-cols-1 items-center justify-center">
          <div className="p-5">
            <h1 className="text-2xl font-bold mb-3 text-center">Signin</h1>
            <form onSubmit={loginHandler}>
              <div className="mb-6 ">
                <label htmlFor="" className="capitalize">
                  Email
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#ccc] p-2 border-none outline-none"
                  name=""
                  id="email"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="pb-2 capitalize">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-[#ccc] p-2 border-none outline-none"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="bg-purple-600 w-24 p-2 text-white"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="mb-3 flex justify-between items-center">
              <Link to="/register">Don't have an account?..</Link>
              <Link to="">Forgot password?..</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}

export default Login
