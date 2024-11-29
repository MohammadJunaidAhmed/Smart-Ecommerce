import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoriesMain = () => {
  const [categories, setCategories] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/category/`
      );
      setCategories(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  if (!categories) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-slate-200 w-full flex flex-wrap gap-16 justify-center py-2">
      <div className="flex flex-col justify-center items-center gap-1 cursor-pointer">
        <img
          src="public/best-deal.png"
          alt="top offers"
          className=" h-24 w-24 rounded-full "
        />
        <div className=" font-medium text-xl">Top Offers</div>
      </div>
      {categories.map((category, index) => {
        return (
          <Link key={index} as={Link} to={`/products?cat_id=${category._id}`}>
            <div className="flex flex-col justify-center items-center gap-1 cursor-pointer">
              <img
                src={category.icon}
                alt="img"
                className=" h-24 w-24 rounded-full "
              />
              <div className=" font-medium text-xl">{category.name}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoriesMain;
