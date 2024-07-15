import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import useCreateOrder from "../../hooks/orders/useCreateOrder";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const {createOrder, isLoading, err} = useCreateOrder()

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 />

      <div className="mx-auto mt-8 w-[90vw]">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse res:block res:w-full">
              <thead className="res:hidden">
                <tr>
                  <td className="px-1 py-2 text-left align-top">Image</td>
                  <td className="px-1 py-2 text-left">Product</td>
                  <td className="px-1 py-2 text-left">Quantity</td>
                  <td className="px-1 py-2 text-left">Price</td>
                  <td className="px-1 py-2 text-left">Total</td>
                </tr>
              </thead>

              <tbody className="res:block res:w-full">
                {cart.cartItems.map((item, index) => (
                  <tr key={index} className="res:flex res:flex-col res:mb-4 res:w-full res:border res:border-gray-200 res:p-2">
                    <td className="p-2 res:flex res:items-center">
                      <span className="res:inline-block res:w-1/4 res:text-gray-500">Image:</span>
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover res:w-1/4" />
                    </td>
                    <td className="p-2 res:flex res:items-center">
                      <span className="res:inline-block res:w-1/4 res:text-gray-500">Product:</span>
                      <Link to={`/product/${item.product}`} className="res:w-3/4">{item.name}</Link>
                    </td>
                    <td className="p-2 res:flex res:items-center">
                      <span className="res:inline-block res:w-1/4 res:text-gray-500">Quantity:</span>
                      <span className="res:w-3/4">{item.qty}</span>
                    </td>
                    <td className="p-2 res:flex res:items-center">
                      <span className="res:inline-block res:w-1/4 res:text-gray-500">Price:</span>
                      <span className="res:w-3/4">{item.price.toFixed(2)}</span>
                    </td>
                    <td className="p-2 res:flex res:items-center">
                      <span className="res:inline-block res:w-1/4 res:text-gray-500">Total:</span>
                      <span className="res:w-3/4">₹ {(item.qty * item.price).toFixed(2)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-5 res:text-xl res:mb-4">Order Summary</h2>
          <div className="flex justify-between flex-wrap p-8 bg-[#181818] res:flex-col res:p-4">
            <ul className="text-lg res:text-base res:mb-4">
              <li className="mb-2 res:mb-1">
                <span className="font-semibold">Items:</span> ₹ {cart.itemsPrice}
              </li>
              <li className="mb-2 res:mb-1">
                <span className="font-semibold">Shipping:</span> ₹ {cart.shippingPrice}
              </li>
              <li className="mb-2 res:mb-1">
                <span className="font-semibold">Tax:</span> ₹ {cart.taxPrice}
              </li>
              <li className="mb-2 res:mb-1">
                <span className="font-semibold">Total:</span> ₹ {cart.totalPrice}
              </li>
            </ul>

            {err?.error && <Message variant="danger">{err?.message}</Message>}

            <div className="res:mb-4">
              <h2 className="text-2xl font-semibold mb-4 res:text-xl res:mb-2">Shipping</h2>
              <p className="res:text-base">
                <strong>Address:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 res:text-xl res:mb-2">Payment Method</h2>
              <strong className="res:text-base">Method:</strong> {cart.paymentMethod}
            </div>
          </div>

          <button
            type="button"
            className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full mt-4 res:text-base res:py-2 res:px-3"
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>

          {isLoading && <Loader />}
        </div>

      </div>
    </>
  );
};

export default PlaceOrder;
