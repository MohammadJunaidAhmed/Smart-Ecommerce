import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const CartMain = () => {
  const [cartData, setCartData] = useState([]);
  const consumerId = localStorage.getItem("consumerId");
  const API_URL = import.meta.env.VITE_API_URL;
  const fetchCartItems = async () => {
    const response = await axios.get(
      `${API_URL}/api/v1/cart/${consumerId}`
    );
    setCartData(response.data);
  };
  const updateCartItems = async(data) => {
    const modifyData = {
        "productId": data.productId,
        "sellerId": data.sellerId,
        "quantity": data.quantity
    }
    await axios.put(`${API_URL}/api/v1/cart/${consumerId}`, modifyData);
    fetchCartItems();
  }
  const removeCartItem = async(data) => {
    const deleteData = {
        "productId": data.productId,
        "sellerId": data.sellerId
    }
    try{
        await axios.delete(`${API_URL}/api/v1/cart/${consumerId}`, {data:deleteData});
        toast("Product removed successfully!");
        fetchCartItems();
    } catch(err){
        console.error(err);
    }
  }
  const handleCheckout = async() => {
    cartData.cartItems.forEach(async(item)=>{
      const data = {
        "consumerId": consumerId,
        "sellerId": item.seller.id,
        "productId": item.product.id,
        "quantity": item.quantity
    }
      const response = await axios.post(`${API_URL}/api/v1/orders/`, data);
      if(response.data.message ===  "Not enough stock available"){
        toast(`${item.product.name} is Out of stock!`)
      }
      // removeCartItem({"productId": item.product.id, "sellerId": item.seller.id});
    })

    await axios.delete(`${API_URL}/api/v1/cart/${consumerId}/all`);
    fetchCartItems();
  }
  useEffect(() => {
    fetchCartItems();
  }, []);
  return (
    <div className="container mx-auto mt-10">
      <div className="sm:flex shadow-md my-10">
        <div className="  w-full  sm:w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">All Items</h2>
          </div>
          { cartData && cartData.cartItems && cartData.cartItems.map((item) => {
            return (
              <div
                className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50"
                key={item.id}
              >
                <div className="md:w-4/12 2xl:w-1/4 w-full">
                  <img
                    src={item.image}
                    alt={item.product.name}
                    className="h-48 w-80 object-center object-cover md:block hidden"
                  />
                </div>
                <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                  <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                    RF293
                  </p>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-base font-black leading-none text-gray-800">
                      {item.product.name}
                    </p>
                    <select
                      aria-label="Select quantity"
                      className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none"
                      onChange={(e)=>{updateCartItems({productId: item.product._id, quantity: e.target.value, sellerId: item.seller._id})}}
                      defaultValue={item.quantity}
                    >
                      <option value="1">01</option>
                      <option value="2">02</option>
                      <option value="3">03</option>
                    </select>
                  </div>
                  <p className="text-xs leading-3 text-gray-600 pt-2">
                    Sold by: {item.seller.name}
                  </p>
                  {/* <p className="text-xs leading-3 text-gray-600 py-4">
                    Color: Black
                  </p>
                  <p className="w-96 text-xs leading-3 text-gray-600">
                    Composition: 100% calf leather
                  </p> */}
                  <div className="flex items-center justify-between pt-5">
                    <div className="flex itemms-center">
                      <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                        Add to favorites
                      </p>
                      <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer" onClick={()=>{removeCartItem({"productId":item.product._id, "sellerId": item.seller._id})}}>
                        Remove
                      </p>
                    </div>
                    {/* <p className="text-base font-black leading-none text-gray-800">
                      ,000
                    </p> */}
                  </div>
                </div>
              </div>
            );
          })}

          <a
            href="#"
            className="flex font-semibold text-indigo-600 text-sm mt-10"
          >
            <svg
              className="fill-current mr-2 text-indigo-600 w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </a>
        </div>
        <div
          id="summary"
          className=" w-full   sm:w-1/4   md:w-1/2     px-8 py-10"
        >
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          {
                cartData && cartData.cartItems && cartData.cartItems.map((item)=>{
                    return (
                        <div className="flex justify-between mt-10 mb-5" key={item._id}>
                            <span className="font-semibold text-sm uppercase">{item.product.name} {item.quantity}</span>
                            <span className="font-semibold text-sm">₹{item.quantity * item.salePrice}</span>
                        </div>
                    )
                })
            }
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">
              Shipping
            </label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - ₹0</option>
            </select>
          </div>
          <div className="py-10">
            <label
              htmlFor="promo"
              className="font-semibold inline-block mb-3 text-sm uppercase"
            >
              Promo Code
            </label>
            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              className="p-2 text-sm w-full"
            />
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
            Apply
          </button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>₹{cartData ? cartData.totalPrice : 0}</span>
            </div>
            <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMain;
