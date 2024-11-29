import { MdOutlineFileUpload } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";

const ActionBar = () => {
  return (
    <>
        <div className="bg-white px-4 py-2 rounded-sm border border-gray-200 flex flex-1 text-gray-200">
            <div className="p-1 flex-1 flex gap-8 text-black">
                <button className="p-3 px-5 rounded-lg flex justify-center items-center gap-2 border-black border  duration-150 hover:border-emerald-500">
                    <MdOutlineFileUpload/>
                    Export
                </button>
                <button className="p-3 px-5 rounded-lg flex justify-center items-center gap-2 border-black border  duration-150 hover:border-emerald-500">
                    <MdOutlineFileDownload/>
                    Import
                </button>
            </div>
        </div>
    </>
  )
}

export default ActionBar