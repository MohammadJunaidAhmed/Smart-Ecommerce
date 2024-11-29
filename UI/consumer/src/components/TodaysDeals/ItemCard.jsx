


const ItemCard = (props) => {
    const imgUrl = props.image;
    return (
      // width should be constant margin should be auto. We will load images into it!
      <div className='h-72 m-4 w-auto rounded-xl transform duration-150 border-r-4 hover:scale-105'> 
          <div className='bg-slate-300 w-full h-full rounded-xl border-2 p-1 border-black flex flex-col'>
              <div className='w-full flex-[2_2_0%] bg-yellow-300 flex justify-center items-center'>
                <img src={imgUrl}/>
              </div>
              <div className='w-full flex-[1_1_0%] bg-green-300 flex justify-center items-center'>{props.title}</div>
          </div>
      </div>
    )
  }
  
  export default ItemCard;