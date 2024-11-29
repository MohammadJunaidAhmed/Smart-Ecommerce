/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Rating } from 'react-simple-star-rating'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';

const ProductCard = ({product}) => {
    const [isHovering, setIsHovering] = useState(false);
  return (
    <div className="h-[22rem] w-[19rem] flex flex-col rounded-xl bg-white border-slate-400 border cursor-pointer duration-300 hover:shadow-2xl" onMouseEnter={()=>{setIsHovering(true)}} onMouseLeave={()=>{setIsHovering(false)}}>
        <div className="h-[55%] bg-black rounded-t-xl overflow-hidden relative">
            {
                isHovering &&
                <div className='h-full w-full flex justify-center z-50 items-center text-black absolute'>
                    <div className='bg-white px-1 flex gap-1 border-green-400 border rounded-xl'>
                        <Tooltip title="Add to Cart" placement='top-start' arrow>
                            <IconButton>
                                <ShoppingCartOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <div className='border border-green-400'></div>
                        <Tooltip title="Quick View" placement='top-end' arrow>
                            <Link
                                as={Link}
                                to={`/product-detail?product_id=${product.id || product.productId}&seller_id=${product.seller || product.sellerId}`}
                            >
                                <IconButton>
                                    <VisibilityOutlinedIcon />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    </div>
                </div>
            }
            <img className={`bg-slate-500 rounded-t-xl w-full object-cover duration-300 flex-1 ${isHovering ? 'opacity-75 scale-110 ':''}`} src={product && product.image}/>
        </div>
        <Link
            as={Link}
            to={`/product-detail?product_id=${product.productId || product.id}&seller_id=${product.sellerId || product.seller}`}
        >
            <div className="h-[45%] p-3">
                <p className="text-xs mb-1">{product && product.category && (product.category.name || product.category)}</p>
                <h1 className='font-bold'>{product && (product.productName || product.name)}</h1>
                <Rating
                SVGstyle={{'display': 'inline', 'height': '30px', 'width': '20px'}}
                initialValue={product.sellerRating || 0}
                readonly
                />
                <p className=" text-xs">By <span className='text-teal-500 text-xs'>{product ? product.sellerName : 'seller name'}</span></p>
                <div className="flex gap-3 items-center mt-2">
                    <h1 className="text-lg font-bold text-teal-500">Rs {product && (product.salePrice || product.price)}</h1>
                    <h1 className="line-through">Rs {product && product.mrp}</h1>
                </div>
            </div>
        </Link>
    </div>
  );
};

export default ProductCard;
