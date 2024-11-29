import { useState, useEffect } from 'react';

const Hero = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/api/v1/products/`)
      .then(response => response.json())
      .then(json => setFeatured(json))
      .catch(error => console.error(error));
  }, []);
  return (
    <div className='w-screen h-fit'>
      {/* <Carousel pause='hover'>
      {
        featured.map((feat)=>{
          return (
            <Carousel.Item key={feat._id} >
              <ExampleCarouselImage text="First slide" image={feat.image} name={feat.name} desc = {feat.richDescription}/>
            </Carousel.Item>
          );
        })
      } 
      </Carousel> */}
    </div>
  )
}

export default Hero;