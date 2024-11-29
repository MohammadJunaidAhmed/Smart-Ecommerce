import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const NewsLetter = () => {
  return (
    <div className="w-full p-6 bg-green-200 rounded-3xl flex justify-between">
      <div className="flex flex-col pl-10">
        <div className="flex-1 flex flex-col mt-6 gap-2">
          <h1 className="text-4xl font-bold tracking-wider leading-relaxed">Stay home & get your daily <br/>
          needs from our shop</h1>
          <h1 className=" text-lg text-slate-500 tracking-wide">Start Your Daily Shopping with V-Shop</h1>
        </div>
        <div className="pb-5">
          <div className="bg-white w-96 rounded-full flex justify-between items-center">
            <div className="px-2 flex gap-2">
              <SendOutlinedIcon/>
              <input type="email" className='focus:outline-none w-56' height={16}/>
            </div>
            <div>
              <button className="px-[30px] py-[11px] text-white duration-300 bg-[#28a745] hover:bg-red-500  rounded-full">Subscribe</button>
            </div>
          </div>
        </div>
      </div>


      <div>
        <img src="NewsLetter.png" className="h-72"/>
      </div>
    </div>
  )
}

export default NewsLetter