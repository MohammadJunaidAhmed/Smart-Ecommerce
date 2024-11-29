import classNames from 'classnames'
import { Link } from 'react-router-dom'
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';


const PopularProducts = () => {
	const API_URL = import.meta.env.VITE_API_URL;
	const [popularProducts, setPopularProducts] = useState([]);
	const fetchPopularProducts = async() =>{
		const sellerId = localStorage.getItem("sellerId");
		const response = await axios.get(`${API_URL}/api/v1/sellers/${sellerId}/popular-products`);
		setPopularProducts(response.data.popularProducts);
	}
	useEffect(()=>{
		fetchPopularProducts();
	},[])
    return (
		<div className="w-[20rem] bg-white p-4 rounded-sm border border-gray-200">
			<strong className="text-gray-700 font-medium">Popular Products</strong>
			<div className="mt-4 flex flex-col gap-3">
				{popularProducts.map((product) => (
					<Link
						key={product.id}
						to={`/product/${product.id}`}
						className="flex items-start hover:no-underline"
					>
						<div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
							<img
								className="w-full h-full object-cover rounded-sm"
								src={product.image}
								alt={product.name}
							/>
						</div>
						<div className="ml-4 flex-1">
							<p className="text-sm text-gray-800">{product.name}</p>
							<span
								className={classNames(
									product.stock === 0
										? 'text-red-500'
										: product.stock > 50
										? 'text-green-500'
										: 'text-orange-500',
									'text-xs font-medium'
								)}
							>
								{product.product_stock === 0 ? 'Out of Stock' : product.stock + ' in Stock'}
							</span>
						</div>
						<div className="text-xs text-gray-400 pl-1.5">{product.price}</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export default PopularProducts