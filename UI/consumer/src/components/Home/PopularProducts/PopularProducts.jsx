import { useEffect, useState } from "react";
import ProductCard from "./ProductCard"
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";



const PopularProducts = () => {
    const [selectedCategory, setSelectedCategory] = useState({id: '', title: ''});
    const [categories, setCategories] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [isFetchingProducts, setIsFetchingProducts] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
    const fetchCategories = async() => {
        const response = await axios.get(`${API_URL}/api/v1/category/`);
        setCategories(response.data)
        setSelectedCategory({id: response.data[0]._id, title: response.data[0].name})
    }
    const fetchPopularProducts = async() => {
        setIsFetchingProducts(true);
        const response = await axios.get(`${API_URL}/api/v1/products/category/${selectedCategory.id}/popular`);
        setPopularProducts(response.data);
        setIsFetchingProducts(false);
    }
    useEffect(()=>{
        if(categories.length === 0){
            fetchCategories();
        }
        if(selectedCategory.id !== ''){
            fetchPopularProducts();
        }
    },[selectedCategory])
  return (
    <div className="py-3">
        <div className="flex justify-between">
            <h1 className="font-bold text-xl">Popular Products</h1>
            <div className="flex gap-3 ">
                {
                    categories.map((category,index)=>{
                        return(
                            <button className={`p-2 ${category.name===selectedCategory.title ? 'border-b-2 border-blue-500' : ''} `} key={index} onClick={()=>setSelectedCategory({id: category._id,title: category.name})}>{category.name}</button>
                        )
                    })
                }
            </div>
        </div>
        <div className="grid grid-cols-5 gap-2 py-2">
            {
                isFetchingProducts && 
                <PacmanLoader />
            }
            {
                !isFetchingProducts && popularProducts.map((product,index)=>{
                    return (
                        <ProductCard key={index} product={product}/>
                    )
                })
            }
        </div>
    </div>
  )
}

export default PopularProducts