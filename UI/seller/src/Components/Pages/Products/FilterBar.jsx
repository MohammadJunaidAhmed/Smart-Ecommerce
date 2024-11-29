import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const CategoryButton = () => {
  const [category, setCategory] = useState("");
  const Categories = ["Electronics", "Books", "Laptops"];

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="Category">Category</InputLabel>
        <Select
          labelId="Category"
          id="Category-select"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          {Categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
const FilterButton = () => {
  const [filter, setFilter] = useState("");
  const Filters = ["Low to High", "High to Low", "Relevance"];

  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="Filter">Filter</InputLabel>
        <Select
          labelId="Filter"
          id="Filter-select"
          value={filter}
          label="Filter"
          onChange={handleChange}
        >
          {Filters.map((ft) => (
            <MenuItem key={ft} value={ft}>
              {ft}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
const SearchProduct = () => {
  return (
    <div className="flex-1 flex w-full h-full">
        <input placeholder="Search" className="flex flex-1 justify-center items-center my-[8.5px] outline-none text-black rounded-md p-3 border-slate-500 border-[1px]"/>
    </div>
  )
};

const FilterBar = () => {
  return (
    <div className="bg-white px-4 py-2 rounded-sm border border-gray-200 flex flex-1 justify-evenly text-gray-200">
      <SearchProduct />
      <CategoryButton />
      <FilterButton />
      <button className="flex-1 my-3 mx-2 bg-emerald-500 rounded-lg flex justify-center items-center">Filter</button>
      <button className="flex-1 my-3 bg-gray-500 rounded-lg flex justify-center items-center">Reset</button>
    </div>
  );
};

export default FilterBar;
