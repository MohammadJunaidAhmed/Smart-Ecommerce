import 'bootstrap/dist/css/bootstrap.min.css';

const ExampleCarouselImage = (props) => {
    const bgImg = props.image;
    const divStyle = {
        backgroundImage: `url(${bgImg})`,
    };
  return (
    <div className='w-full h-96 bg-gray-100 p-4 flex justify-center cursor-pointer'>
      <div className='w-[90vw] sm:w-4/5 bg-no-repeat bg-cover flex flex-col justify-center items-center rounded-3xl hover:w-[93vw] ease-in-out duration-150 hover:opacity-95' style={{ ...divStyle}}>
        <h1 className='text-white p-4 font-serif font-bold text-8xl italic text-opacity-100 hover:drop-shadow-md'>{props.name}</h1>
        {/* <h1>{props.desc}</h1> */}
      </div>
    </div>
  )
}

export default ExampleCarouselImage