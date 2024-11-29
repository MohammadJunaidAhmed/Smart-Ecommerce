import CategoriesMain from '../Categories/CategoriesMain';
import PopularProducts from './PopularProducts/PopularProducts';


const Home = () => {
    return (
        <div className={`w-screen min-h-[70vh] flex justify-center`}>
            <div className='w-[95vw] h-fit py-1'>
                <CategoriesMain/>
                <PopularProducts/>
            </div>
        </div>
    )
  };
  
  export default Home;