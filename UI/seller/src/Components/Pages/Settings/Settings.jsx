import { useState } from "react";
import { StyledDropZone } from "react-drop-zone";
import "react-drop-zone/dist/styles.css";

const ImageDrop = () => {
  //TODO: ALSO ADD `PREVIEW-DROP_IMAGES`
  const [file, setFile] = useState(null);
  const label = file ? file : "Click or drop your file here";
  return (
    <div className="flex py-3 px-7 items-center border-black">
      <h1 className="flex-1">Profile Picture</h1>
      <StyledDropZone onDrop={setFile} label={label} className="flex-1 h-32 flex justify-center items-center p-3 rounded-md bg-inherit border-black border-[1px]"/>
    </div>
  );
};
const Settings = () => {
  return (
    <div className={`w-full h-full gap-8 relative overflow-x-hidden p-2`}>
      <div className="w-full h-full z-30 flex flex-col gap-6">
        <div className="font-bold font-serif text-2xl px-1">
          <h1>Settings</h1>
        </div>
        <div className="flex flex-col gap-4">
          <form className="border-black">
            <ImageDrop />
            <div className="flex py-3 px-7 items-center ">
              <h1 className="flex-1">User Name</h1>
              <input
                type="text"
                className="flex-1 flex justify-end p-3 rounded-md bg-inherit border-black border-[1px]"
                placeholder={localStorage.getItem("sellerName")}
              />
            </div>
            <div className="flex py-3 px-7 items-center">
              <h1 className="flex-1">Email</h1>
              <input
                type="email"
                className="flex-1 flex justify-end p-3 rounded-md bg-inherit border-black border-[1px]"
                placeholder={localStorage.getItem("sellerEmail")}
              />
            </div>
            <div className="flex py-3 px-7 items-center">
              <h1 className="flex-1">Contact Number</h1>
              <input
                type="mobile"
                className="flex-1 flex justify-end p-3 rounded-md bg-inherit border-black border-[1px]"
                required
                placeholder={localStorage.getItem("sellerMobile")}
              />
            </div>
            <div className="flex justify-end py-3 px-7">
              <button className="rounded-lg border-black bg-emerald-500 p-3">Update Profile</button>
            </div>
            {/* <img src={localStorage.getItem("sellerPhoto")}/> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
