import React, {useContext} from "react";
import EcomContext from "../../context/EcomContext";

function Checkout() {
  const {
    cartItems,
    calTotalAmount,
  } = useContext(EcomContext);
  
// console.log(window)
  const handlePayment = async(e) => {
    e.preventDefault()
    const firstName = e.target.value;
    const lastName = e.target.value;
    const email = e.target.value;
    const address = e.target.value;
    const phone = e.target.value;
    const amount = calTotalAmount().toFixed(2);

    try{
        const response = await fetch(
          "http://localhost:8000/api/initiate-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token")
            },
            body: JSON.stringify({
              firstName, 
              lastName,
              email,
              address,
              phone, 
              amount,
            })});
          const data = await response.json();
          console.log(response)
          if(response.ok) {
            window.location= data.data;
          }else{
            showAndHide("error", data.message)
          }
    }catch(error) {
      console.log(error)
    }
  }

  const newcart = cartItems?.products?.map((items) => (
    <tr key={items.id}>
      <td>{items?.product?.id}</td>
      <td>{items?.product?.name}</td>
      <td>{items?.quantity}</td>
      <td>${items?.amount}</td>
    </tr>
  ));

  return (
    <div className="container-box mt-12 mb-12"> 
      <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-3">
        {/* table */}
            <div className="table md:col-span-2">
            <table>
          <thead>
            <tr>
              <th>S/n</th>
              <th>Product</th>
              <th>quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
          {cartItems?.products?.length > 0 ? (
              newcart
            ) : (
              <tr>
                <td colSpan="7">
                  <h6 className="m-auto text-center uppercase">
                    No items in cart
                  </h6>
                </td>
              </tr>
            )}
          </tbody>
        </table>
            </div>
        {/* table */}
        {/* form */}
            <div className="cform bg-slate-400 px-2 py-3">
                <form onSubmit={(e) => handlePayment(e)}>
                    <div className="mb-2">
                        <label htmlFor="">First Name</label>
                        <input type="text" className="w-full border-none outline-none" name="firstName" id="" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Last Name</label>
                        <input type="text" className="w-full border-none outline-none" name="lastName" id="" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Address</label>
                        <input type="text" className="w-full border-none outline-none" name="address" id="" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email Address</label>
                        <input type="email" className="w-full border-none outline-none" name="email" id="" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Phone</label>
                        <input type="text" className="w-full border-none outline-none" name="phone" id="" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Total</label>
                        {/* <input type="text" className="w-full border-none outline-none" name="" value={456} id="" /> */}
                        <h5 className="bg-[#fff] p-2" name="amount">${calTotalAmount().toFixed(2)}</h5>
                    </div>
                    <div className="mb-2">
                        <button type="submit" className="btn hover:bg-purple-500">Pay</button>
                    </div>
                </form>
            </div>
        {/* form */}
      </div>
    </div>
  );
}

export default Checkout;
