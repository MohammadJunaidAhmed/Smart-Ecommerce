import axios from "axios";
import { useEffect, useState } from "react";

const Orders = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const consumerId = localStorage.getItem("consumerId");
    const [orderHistory, setOrderHistory] = useState([]);
    const fetchOrders = async() => {
        const response = await axios.get(`${API_URL}/api/v1/consumers/${consumerId}/orders`);
        setOrderHistory(response.data.allOrders);
    }
    useEffect(()=>{
        fetchOrders();
    },[])
    if(!orderHistory){
        return <h1>Loading...</h1>
    }
  return (
    <section className="py-0 pb-5 relative">
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="mt-7 border border-gray-300 pt-9">
            <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
                <div className="data">
                    <p className="font-medium text-3xl leading-8 text-black whitespace-nowrap">Orders</p>
                </div>
                <div className="flex items-center gap-3 max-md:mt-5">
                    <button
                        className="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400">Show
                        Invoice</button>
                    <button
                        className="rounded-full px-7 py-3 bg-indigo-600 shadow-sm shadow-transparent text-white font-semibold text-sm transition-all duration-500 hover:shadow-indigo-400 hover:bg-indigo-700">Buy
                        Now</button>

                </div>
            </div>
            {
                orderHistory.map((order)=>{
                    return (
                        <div key={order._id}>
                        <svg className="my-9 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2"
                            fill="none">
                            <path d="M0 1H1216" stroke="#D1D5DB" />
                        </svg>

                        <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                            <div className="grid grid-cols-4 w-full">
                                <div className="col-span-4 sm:col-span-1">
                                    {/* <img src="https://pagedone.io/asset/uploads/1705474774.png" alt="" className="max-sm:mx-auto object-cover"/> */}
                                    <img src={order.image} alt="img" className="max-sm:mx-auto object-cover"/>
                                </div>
                                <div
                                    className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                                    <h6 className="font-manrope font-semibold text-2xl leading-9 text-black mb-3 whitespace-nowrap">
                                        {order.product ? order.product.name : 'product name'}</h6>
                                    <p className="font-normal text-lg leading-8 text-gray-500 mb-8 whitespace-nowrap">By: {order.seller.name}</p>
                                    <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                                        {/* <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">Size: s</span> */}
                                        <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">Qty: {order.quantity}</span>
                                        <p className="font-semibold text-xl leading-8 text-black whitespace-nowrap">Price ₹{order.totalPrice}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-around w-full  sm:pl-28 lg:pl-0">
                                <div className="flex flex-col justify-center items-start max-sm:items-center">
                                    <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                                        Status</p>
                                    <p className={`font-semibold text-lg leading-8 text-left whitespace-nowrap ${order.status === "Pending" ? 'text-yellow-500' : ''} ${order.status === "Shipped" ? 'text-amber-800' : ''} ${order.status === "Cancelled" ? 'text-red-500' : ''} ${order.status === "Delivered" ? 'text-green-500' : ''}`}> {order.status} </p>
                                </div>
                                <div className="flex flex-col justify-center items-start max-sm:items-center">
                                    <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                                        Ordered Date</p>
                                    <p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">23rd March
                                        2021</p>
                                </div>
                            </div>

                        </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
</section>
                                        
                                        
  )
}

export default Orders