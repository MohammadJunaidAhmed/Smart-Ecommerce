
const SearchProduct = () => {
  return (
    <div className="flex-1 flex w-full h-full">
        <input placeholder="Search" className="flex flex-1 justify-center items-center my-[8.5px] outline-none text-black rounded-md p-3 border-slate-500 border-[1px]"/>
    </div>
  )
};

const FilterBar = () => {
  return (
    <div className="bg-white px-4 py-2 rounded-sm border border-gray-200 flex gap-4 flex-1 justify-evenly text-gray-200">
      <SearchProduct />
      <button className=" w-80 h-12 my-[8px] ml-5 bg-emerald-500 rounded-lg flex justify-center items-center">Filter</button>
      <button className=" w-80 h-12 my-[8px] bg-gray-500 rounded-lg flex justify-center items-center">Reset</button>
    </div>
  );
};

export default FilterBar;
