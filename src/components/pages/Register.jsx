import React, { useContext, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import EcomContext from "../../context/EcomContext";
import AuthContext from "../../context/AuthContext";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { showAndHide, isAuthenticated } = useContext(EcomContext);
  const redirect = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  const registerHandler = async (e) => {
    e.preventDefault();
    console.log("Submitted")

    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          phone,
          role,
          address,
          password,
          confirmPassword,
        })
      })

      const data = await res.json();
      if (!res.ok) {
        showAndHide("error", data.message);
      }else {
        showAndHide("success", data.message);
        redirect("/login");
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
        <div className="h-full">
          <div className="m-auto mt-16 max-w-lg w-full rounded shadow-lg">
            <div className="grid grid-cols-1 items-center justify-center">
              <div className="p-5">
                <h1 className="text-2xl font-bold mb-3 text-center">Signup</h1>
                <form onSubmit={registerHandler}>
                  <div className="mb-6 ">
                    <label htmlFor="" className="capitalize">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full bg-[#ccc] p-2 border-none outline-none"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-6 ">
                    <label htmlFor="" className="capitalize">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#ccc] p-2 border-none outline-none"
                      id="firstName"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="mb-6 ">
                    <label htmlFor="" className="capitalize">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#ccc] p-2 border-none outline-none"
                      id="lastName"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="mb-6 ">
                    <label htmlFor="" className="capitalize">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#ccc] p-2 border-none outline-none"
                      id="phone"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="mb-6 ">
                    <label htmlFor="" className="capitalize">
                      Address
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#ccc] p-2 border-none outline-none"
                      id="phone"
                      onChange={(e) => setAddress(e.target.value)}
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
                  <div className="mb-6">
                    <label htmlFor="password" className="pb-2 capitalize">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full bg-[#ccc] p-2 border-none outline-none"
                        id="confirmPassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                      Register
                    </button>
                  </div>
                </form>
                <div className="mb-3 text-end">
                  <Link to="/login">Already Have an account?...</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Register
