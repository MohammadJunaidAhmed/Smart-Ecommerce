import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
const ProductCardMain = ({ product }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [isInCart, setIsInCart] = useState(false);
  const consumerId = localStorage.getItem("consumerId");
  const navigate = useNavigate();
  const handleAddtoCart = async () => {
    // Add product to cart
    const cartData = {
      consumerId: localStorage.getItem("consumerId"), //Make this consumerId dynamic;
      productId: product.id,
      sellerId: product.seller,
      quantity: 1,
    };
    await axios.post(
      `${API_URL}/api/v1/cart`,
      cartData
    );
    toast("Product added to cart!")
    checkIsInCart();
  };
  const checkIsInCart = async() => {
    try{
      const response = await axios.get(`${API_URL}/api/v1/cart/${consumerId}`);
      const isProductInCart = response.data.cartItems.some((item) => item.product.id === product.id && item.seller.id == product.seller);
      setIsInCart(isProductInCart);
    } catch(err){
      console.error(err);
    }
  }
  useEffect(()=>{
    checkIsInCart();
  },[])
  return (
    <div className="max-w-md w-full px-3">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl">
        <Link as={Link} to={`/product-detail?product_id=${product.id}&seller_id=${product.seller}`}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-600 opacity-75"></div>
          <div className="flex justify-center">
            <img
              src={product ? product.image : ""}
              alt="Product Image"
              className="h-64 object-center relative z-10"
            />
          </div>
          <div className="absolute top-4 right-4 bg-gray-100 text-xs font-bold px-3 py-2 rounded-full z-20 transform rotate-12">
            NEW
          </div>
        </div>
        </Link>
        <div className="p-6 h-[18rem] flex flex-col justify-between">
          <Link
            as={Link}
            to={`/product-detail?product_id=${product.id}&seller_id=${product.seller}`}
          >
            <h2 className="text-xl font-extrabold text-gray-800 mb-2">
              {product.name ? product.name : "product name"}
            </h2>
            <p className="text-gray-600 mb-4">
              {product.description ? product.description : "description"}
            </p>
            
          </Link>
          <div className="">
          <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold text-indigo-600">
                ₹{product.price ? product.price : "price"}
              </span>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 text-gray-600">
                  {product.sellerRating} ({product.numReviews} reviews)
                </span>
              </div>
            </div>
              {
                isInCart &&
                <button
                  className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                  // onClick={handleAddtoCart}
                  onClick={()=>navigate('/cart')}
                >
                  Go to Cart
                </button>
              }
              {
                !isInCart &&
                <button
                  className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                  onClick={handleAddtoCart}
                >
                  Add to Cart
                </button>
              }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardMain;
