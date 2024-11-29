import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CategoryCard from "./CategoryCard";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";



const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1400 },
    items: 8,
    slidesToSlide: 1 // optional, default to 1.
  },
  smallDesktop: {
    breakpoint: { max: 1400, min: 1024 },
    items: 6,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1100, min: 924 },
    items: 5,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 924, min: 750 },
    items: 4,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobileSmall: {
    breakpoint: { max: 750, min: 464 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  }
};


// const categories = [
//       { id: 1, title: 'Category 1', description: 'Description 1' },
//       { id: 2, title: 'Category 2', description: 'Description 2' },
//       { id: 3, title: 'Category 3', description: 'Description 3' },
//       { id: 4, title: 'Category 4', description: 'Description 4' },
//       { id: 5, title: 'Category 5', description: 'Description 5' },
//       { id: 6, title: 'Category 6', description: 'Description 6' },
//       { id: 7, title: 'Category 7', description: 'Description 7' },
//       { id: 8, title: 'Category 8', description: 'Description 8' },
//       { id: 9, title: 'Category 9', description: 'Description 9' },
//       { id: 10, title: 'Category 10', description: 'Description 10' },
//       { id: 11, title: 'Category 11', description: 'Description 11'},
//       // Add more categories as needed
//     ];

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
    const fetchCategories = async() => {
      try{
        const response = await axios.get(`${API_URL}/api/v1/category/`);
        setCategories(response.data);
      }
      catch(err){
        console.error(err);
      }
    }
    useEffect(() => {
      fetchCategories();
    }, []);
  return (
    <div className="parent">
      <Carousel
        responsive={responsive}
        autoPlay={true}
        infinite={true}
        swipeable={true}
        draggable={true}
        showDots={true}
        partialVisible={false}
        arrows={true}
        transitionDuration={150}
        dotListClass="custom-dot-list-style"
      >
        {categories.map((category) => {
          return (
            <div className="slider" key={category._id}>
              <Link as={Link} to={`/products?cat_id=${category._id}`}>
                <CategoryCard name={category.name} icon={category.icon} color={category.color}/>
              </Link>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default Categories;
