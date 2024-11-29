


const CategoryCard = (props) => {
  return (
    // width should be constant margin should be auto. We will load images into it!
    <div className=' h-48 m-4 w-44 rounded-xl transform duration-150 border-r-4 hover:scale-105'> 
        <div className='bg-slate-300 w-full h-full rounded-xl border-2 p-1 pb-1 border-black flex flex-col' style={{backgroundColor: props.color}}>
            <div className='w-full flex-[2_2_0%] border-2 border-black flex justify-center items-center'>
              <img src={props.icon} className="h-full w-full"/>
            </div>
            <div className='w-full h-fit flex-[1_1_0%] bg-green-300 flex justify-center items-center font-bold font-serif text-black' style={{backgroundColor: props.color}}>{props.name}</div>
        </div>
    </div>
  )
}

export default CategoryCard;