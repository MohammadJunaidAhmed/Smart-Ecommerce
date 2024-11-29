import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 0,
    label: "0Rs",
  },
  {
    value: 200000,
    label: "200000Rs",
  },
];

const ProductsLayout = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search");
  const [allCategories, setAllCategories] = useState(null);
  const [priceRange, setPriceRange] = useState([
    searchParams.get("minPrice") || 0,
    searchParams.get("maxPrice") || 1000000,
  ]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const cat_id = searchParams.get("cat_id");
  const navigate = useNavigate();

  const fetchAllCategories = async () => {
    const response = await axios.get(`${API_URL}/api/v1/category/`);
    if (cat_id) {
      setSelectedCategory(
        response.data.find((category) => category.id === cat_id)
      );
    }
    setAllCategories(response.data);
  };
  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    navigate(
      `/products?${cat_id ? `cat_id=${cat_id}&` : ``}minPrice=${
        priceRange[0]
      }&maxPrice=${priceRange[1]}${search ? `&search=${search}` : ``}`
    );
  }, [priceRange]);

  return (
    <div className="w-screen h-fit p-4 flex flex-col gap-4">
      <div className="bg-green-200 w-full rounded-xl px-8 py-4 flex flex-col gap-2">
        <h1 className=" font-semibold text-2xl">
          {selectedCategory ? selectedCategory.name : "All Categories"}
        </h1>
        <ul className="flex gap-4 cursor-pointer">
          <Link as={Link} to={"/"}>
            <li>Home</li>
          </Link>
        </ul>
      </div>
      <div className="flex gap-4">
        <div className="w-1/4 flex flex-col gap-4">
          <div className="border-slate-300 border p-4 rounded-xl shadow-md">
            <h1 className="font-semibold pb-2">Category</h1>
            <hr className="py-1" />
            <div className="flex flex-col gap-2 h-60 overflow-auto">
              {allCategories &&
                allCategories.map((category, index) => {
                  return (
                    <Link
                      as={Link}
                      key={index}
                      to={`/products?cat_id=${category._id}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`}
                    >
                      <div
                        key={index}
                        className="cursor-pointer py-2 px-1 border border-slate-500 rounded-md flex gap-2 items-center"
                      >
                        <img
                          src={category.icon}
                          alt="icon"
                          className="h-10 w-10"
                        />
                        <h1>{category.name}</h1>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="border-slate-300 border p-4 h-64 rounded-xl shadow-md">
            <h1 className="font-semibold pb-2">Filter by price</h1>
            <hr className="py-1" />
            <Box sx={{ width: 250, padding: 2 }}>
              <Slider
                track={true}
                aria-labelledby="track-false-range-slider"
                defaultValue={[0, 100000]}
                min={0}
                max={200000}
                step={1000}
                onChangeCommitted={(event, newValue) => {
                  setPriceRange(newValue);
                }}
                valueLabelDisplay="auto"
                marks={marks}
              />
            </Box>

            <br />
            <h1 className="font-semibold pb-2">Filter By Ratings</h1>
            <hr className="py-1" />
          </div>
        </div>
        <section className="w-full">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default ProductsLayout;
