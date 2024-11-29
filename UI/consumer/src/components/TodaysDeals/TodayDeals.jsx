import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./Card";
import ItemCard from "./ItemCard";

import { useState, useEffect } from 'react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const TodayDeals = () => {
  const [categories, setCategories] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
    useEffect(() => {
      fetch(`${API_URL}/api/v1/products/get/featured/`)
        .then(response => response.json())
        .then(json => setCategories(json))
        .catch(error => console.error(error));
    }, []);
  return (
    <div className="w-full h-96 items-end pt-16">
        <div className="w-1/5 h-full float-left bg-red-300">
            <Card/>
        </div>
        <div className="parent bg-yellow-300 w-4/5 h-full float-right">
            <Carousel
                responsive={responsive}
                autoPlay={true}
                infinite={true}
                swipeable={true}
                draggable={true}
                partialVisible={false}
                arrows={true}
                transitionDuration={150}
            >
                {categories.map((category) => {
                return (
                    <div className="slider" key={category.id}>
                        <ItemCard title={category.name} description={category.description} image={category.image}/>
                    </div>
                );
                })}
            </Carousel>
        </div>
    </div>
  );
};

export default TodayDeals;
