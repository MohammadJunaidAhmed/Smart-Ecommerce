import { useState } from "react"

const FEATURES = [
    {
        image: 'offers.svg',
        title: 'Best Prices & Offers',
        description: 'Orders 200Rs or More '
    },
    {
        image: 'FreeDelivery.svg',
        title: 'Free delivery',
        description: 'Orders 200Rs or More '
    },
    {
        image: 'GreatDeal.svg',
        title: 'Great daily deal',
        description: 'Orders 200Rs or More '
    },
    {
        image: 'EasyReturns.svg',
        title: 'Easy returns',
        description: 'Orders 200Rs or More '
    },
    
]

const UniqueFeatures = () => {
    const [isHovering, setIsHovering] = useState(false);
  return (
    <div className="flex justify-between gap-4 mt-4 mb-4">
        {
            FEATURES.map((feature, index)=>{
                return (
                    <div key={index} className="flex p-4 flex-1 gap-3 bg-gray-200 rounded-2xl" onMouseEnter={()=>setIsHovering(feature.title)} onMouseLeave={()=>setIsHovering('')}>
                        <div className={`flex duration-300 ${isHovering === feature.title ? ' -translate-y-2' : ''}`}>
                            <img src={feature.image} alt="img" width={40}/>
                        </div>
                        <div className="flex flex-col justify-between gap-2">
                            <h1 className="p-1 font-bold">{feature.title}</h1>
                            <h1 className="p-1">{feature.description}</h1>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default UniqueFeatures