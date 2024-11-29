import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const StatusButton = () => {
  const [status, setStatus] = useState("");
  const allStatus = ["Delivered", "Pending", "Processing", "Cancel"];

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="Status">Status</InputLabel>
        <Select
          labelId="Status"
          id="Status-select"
          value={status}
          label="Status"
          onChange={handleChange}
        >
          {allStatus.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
const MetodButton = () => {
  const [method, setMethod] = useState("");
  const allMethods = ["Cash", "Credit", "UPI"];

  const handleChange = (event) => {
    setMethod(event.target.value);
  };
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="Method">Method</InputLabel>
        <Select
          labelId="Method"
          id="Method-select"
          value={method}
          label="Method"
          onChange={handleChange}
        >
          {allMethods.map((cat) => (
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
  const Filters = ["Last 5 days orders", "Last 7 days orders", "Last 15 days orders", "Last 30 days orders"];

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
      <input
        placeholder="Search"
        className="flex flex-1 justify-center items-center my-[8.5px] outline-none text-black rounded-md p-3 border-slate-500 border-[1px]"
      />
    </div>
  );
};

const FilterBar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  return (
    <div className="bg-white px-4 py-2 rounded-sm border border-gray-200 flex flex-col flex-1 justify-evenly text-gray-200">
      <div className="bg-white px-4 py-2 rounded-sm border-gray-200 flex flex-1 justify-evenly text-gray-200">
        <SearchProduct />
        <StatusButton/>
        <MetodButton/>
        <FilterButton/>
      </div>
      <div className="bg-white px-4 py-2 rounded-sm border-gray-200 gap-2 flex flex-1 justify-evenly items-center text-gray-200">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={startDate}
              onChange={(newDate) => setStartDate(newDate)}
              id="StartDateId"
              label="Start Date"
            />
          </DemoContainer>
        </LocalizationProvider>
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={endDate}
              onChange={(newDate) => setEndDate(newDate)}
              id="EndDateId"
              label="End Date"
            />
          </DemoContainer>
        </LocalizationProvider>
        <button className="flex-1 p-4 mx-2 bg-emerald-500 rounded-lg flex justify-center items-center">
          Filter
        </button>
        <button className="flex-1 p-4 bg-gray-500 rounded-lg flex justify-center items-center">
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
