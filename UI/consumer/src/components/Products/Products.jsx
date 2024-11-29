import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "../Home/PopularProducts/ProductCard";


const Products = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cat_id = searchParams.get("cat_id");
  const categoryParams = {
    cat_id: searchParams.get("cat_id"),
    minPrice: searchParams.get("minPrice"),
    maxPrice: searchParams.get("maxPrice"),
    search: searchParams.get("search"),
  };
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProductsByCategory = async () => {
    setIsLoading(true);
      const response = await axios.get(
        `${API_URL}/api/v1/products/?${cat_id && `categoryId=${cat_id}&`}minPrice=${categoryParams.minPrice}&maxPrice=${categoryParams.maxPrice} ${categoryParams.search ? `&search=${categoryParams.search}`: ''}`
      );
      setProducts(response.data.allProducts);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProductsByCategory();
  }, [categoryParams.cat_id, categoryParams.minPrice, categoryParams.maxPrice, categoryParams.search]);



  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <h1 className="font-bold text-2xl">Loading...</h1>
      </div>
    );
  }
  if (products.length == 0) {
    return (
      <div className="w-screen h-[600px] flex justify-center items-center">
        <h1 className="font-bold text-2xl">No Products Found!</h1>
      </div>
    );
  }
  return (
    <div className="w-full h-fit p-4 flex flex-col gap-4">
      
        <div className="w-full h-full bg-white grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product,index) => {
            return (
              <ProductCard key={index} product={product} />
            );
          })}
        </div>
      </div>
  );
};

export default Products;
