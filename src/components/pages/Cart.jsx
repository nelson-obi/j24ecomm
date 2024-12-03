import React, { useContext } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";
import EcomContext from "../../context/EcomContext";

function Cart() {
  const {
    cartItems,
    removeCartItems,
    updateCartItem,
    calcSubTotalAmount,
    calcVatAmount,
    calTotalAmount,
  } = useContext(EcomContext);

  const newcart = cartItems?.products?.map((items) => (
    <tr key={items.id}>
      <td>{items.product.id}</td>
      <td>{items.product.name}</td>
      <td>${items.product.price}</td>
      <td>
        <input
          type="number"
          className="w-24 border-none outline-none p-1"
          min="1"
          value={items.quantity}
          onChange={(e) => updateCartItem(parseInt(items.product.id), parseInt(e.target.value))}
          id="items"
        />
      </td>
      <td>{items.quantity}</td>
      <td>${items.amount}</td>
      <td>
        <button type="submit" onClick={() => removeCartItems(items.product.id)}>
          <HiOutlineXMark className="text-2xl" />
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="container-box mt-12 mb-12">
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>S/n</th>
              <th>Product</th>
              <th>Price</th>
              <th>Update</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Delete</th>
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

        <table>
          <tbody>
            <tr>
              <td colSpan="8"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Subtotal: ${calcSubTotalAmount()}</td>
            </tr>
            <tr>
              <td colSpan="8"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Vat(7.5%): ${calcVatAmount()}</td>
            </tr>
            <tr>
              <td colSpan="8"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Total: ${calTotalAmount()}</td>
            </tr>
            <tr>
              <td colSpan="8"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <Link
                  to="/checkout"
                  className="btn hover:bg-purple-500 text-white"
                >
                  Checkout
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cart;
