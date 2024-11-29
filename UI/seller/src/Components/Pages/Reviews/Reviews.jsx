import { useEffect, useState } from "react"
import axios from "axios";

const Messages = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [reviews, setReviews] = useState([]);
  const sellerId = localStorage.getItem("sellerId");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Call the API to get all products for a seller
        const response = await axios.get(`${API_URL}/api/v1/sellers/${sellerId}/reviews`);
        setReviews(response.data.reviews); 
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {
        reviews.map((review)=>{
         return (
          <h1 key={review.id}>
            {review.comment}
            {review.rating}
            {review.consumer}
            {review.createdAt}
          </h1>
         ) 
        })
      }
    </div>
  )
}

export default Messages