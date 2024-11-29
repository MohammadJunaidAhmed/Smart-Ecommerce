import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { Rating } from 'react-simple-star-rating'
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [reviews, setReviews] = useState([]);
  const [isInCart, setIsInCart] = useState(false);
  const [productData, setProductData] = useState([]) ;
  const [searchParams, setSearchParams] = useSearchParams();
  const productId = searchParams.get("product_id");
  const sellerId =  searchParams.get("seller_id");
  const consumerId = localStorage.getItem("consumerId");
  const [myReview, setMyReview] = useState({});

  const fetchProducts = async() => {
    const response = await axios.get(`${API_URL}/api/v1/products/${productId}/sellers/${sellerId}/`)
    setProductData(response.data.product);
  }
  const fetchReviews = async() => {
    const response = await axios.get(`${API_URL}/api/v1/products/${productId}/sellers/${sellerId}/reviews`);
    setReviews(response.data.reviews);
  }
  const handleAddReview = async() => {
    if(!myReview.rating || !myReview.message){
      toast("Rating Can't be empty");
      return;
    }
    if(!myReview.message){
      toast("Message Can't be empty");
      return;
    }
    const consumerId = localStorage.getItem("consumerId");
    const data = {
      "consumerId": consumerId,
      "rating": myReview.rating,
      "comment": myReview.message
    }  
    await axios.post(`${API_URL}/api/v1/products/${productId}/sellers/${sellerId}/reviews`, data);
    setMyReview({'message': '', 'rating': 0});
    fetchReviews();
  }
  const handleAddtoCart = async() => {
    // Add product to cart
    const cartData = {
        "consumerId": localStorage.getItem('consumerId'),
        "productId": productId,
        "sellerId": sellerId,
        "quantity": 1
    }
    await axios.post(`${API_URL}/api/v1/cart`, cartData);
    toast("Item added to cart successfully!")
    setIsInCart(true);
  }
  const handleRating = (rate) => {
    setMyReview({...myReview,'rating': rate});
  }
  const checkIsInCart = async() => {
    try{
      const response = await axios.get(`${API_URL}/api/v1/cart/${consumerId}`);
      const isProductInCart = response.data.cartItems.some((item) => item.product.id === productId && item.seller.id == sellerId);
      setIsInCart(isProductInCart);
    } catch(err){
      console.error(err);
    }
  }
  useEffect(()=>{
    fetchProducts();
    fetchReviews();
    checkIsInCart();
  },[])

  if(!productData && productData.seller){
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section: Product Image */}
        <img
          src={productData && productData.seller && productData.seller.images[0]}
          alt={productData ? productData.name : ''}
          className="h-96 rounded-lg shadow-md"
        />

        {/* Right Section: Product Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {productData ? productData.name : ''}
          </h1>
          <p className="text-2xl font-semibold text-gray-600 mb-4">
            {productData && productData.seller && productData.seller.price}
          </p>
          <p className="text-gray-700 mb-6">{ productData ? productData.description : 'description'}</p>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            {
              isInCart && 
              <Link as={Link} to={'/cart'}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Go to Cart
                </button>
              </Link>
            }
            {
              !isInCart && 
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors" onClick={handleAddtoCart}>
                Add to Cart
              </button>
            }
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
              Buy Now
            </button>
          </div>

          {/* Reviews Section */}
          <div className="border-t border-gray-300 pt-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reviews</h2>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-700">{review.author}</p>
                    <div className="text-yellow-500">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Add Review Section */}
            <div className="mt-6">
              <h3 className="text-xl  font-semibold text-gray-700">Add a Review</h3>
              <Rating
              onClick={handleRating}
              SVGstyle={{'display': 'inline'}}
              initialValue={myReview.rating}
              />
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:border-blue-500"
                rows="3"
                placeholder="Write your review here..."
                value={myReview.message}
                onChange={(e) => {setMyReview({...myReview,'message': e.target.value})}}
              />
              <button
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleAddReview}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
