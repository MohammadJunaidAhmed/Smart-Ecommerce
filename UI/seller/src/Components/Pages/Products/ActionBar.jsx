/* eslint-disable react/prop-types */
import { GoPlus } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdOutlineFileUpload } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyledDropZone } from "react-drop-zone";
// import "react-drop-zone/dist/styles.css";

const DeleteDialog = ({
  selectedRows,
  open,
  setOpen,
  sellerId,
  setDeletingProduct,
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  const deleteProducts = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      // Call the API to get all products for a seller
      const data = {
        productsList: selectedRows.map((row) => {
          return row[0];
        }),
      };
      await axios.delete(
        `${API_URL}/api/v1/sellers/${sellerId}/products/bulk/delete`,
        { data }
      );
    } catch (err) {
      console.error(err);
    }
    setOpen(false);
    setDeletingProduct(true);
    const notify = () => toast("Product Deleted Successfully!");
    notify();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete these products?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {selectedRows.map((row) => {
            return <div key={row}>{row[1]}</div>;
          })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={deleteProducts} autoFocus color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ModifyDialog = ({selectedRows,isModifyingProduct,setIsModifyingProduct,}) => {
  const [selectedFiles, setSelectedFiles] = useState({});
  const sellerId = localStorage.getItem("sellerId");
  const handleClose = () => {
    setIsModifyingProduct(false);
    setSelectedFiles({});
  };
  const handleFileUpload = (event, rowId) => {
    const file = event.target.files[0]; // Get the first file from the input
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Update the selectedFiles state with the image preview URL
        setSelectedFiles((prevState) => ({
          ...prevState,
          [rowId]: {
            file, // Store the file itself
            preview: e.target.result, // Store the image preview URL
          },
        }));
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };
  const handleChanges = async() =>{
    const API_URL = import.meta.env.VITE_API_URL;
    try{
      selectedRows.map(async(row)=>{
        try{
          const formData = new FormData();
          const productId = row[0];
          formData.append(`file`,selectedFiles[productId].file);
          await axios.put(`${API_URL}/api/v1/sellers/${sellerId}/products/${productId}`, formData,{
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          handleClose();
        }catch(err){
          console.error(err);
        }
      })
     
    }catch(err){
      console.error(err);
    }
  }
  return (
    <Dialog
      open={isModifyingProduct}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
    >
      <DialogTitle id="alert-dialog-title">
        {"Modify these products"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {selectedRows.map((row) => {
            return (
              <div key={row} className="flex gap-5 justify-between py-1">
                <h1>{row[1]}</h1>
                <label htmlFor={`file-upload-${row[0]}`} className="bg-blue-500 text-white px-2 py-1 h-8 rounded cursor-pointer">
                    Upload Image
                </label>
                <input
                  type="file"
                  onChange={(event) => handleFileUpload(event, row[0])}
                  style={{'display':"none"}}
                  id={`file-upload-${row[0]}`} // Unique id for each file input
                  name="help"
                />
                {selectedFiles[row[0]] && selectedFiles[row[0]].preview && (
                  <img
                    src={selectedFiles[row[0]].preview}
                    alt="Preview"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                )}
              </div>
            );
          })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleChanges}
          autoFocus
          variant="contained"
          color="success"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ActionBar = ({
  selectedRows,
  sellerId,
  setAddingProduct,
  setIsExportClicked,
  apiRef,
  deletingProduct,
  setDeletingProduct,
}) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [open, setOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isModifyingProduct, setIsModifyingProduct] = useState(false);
  const ImageDrop = () => {
    //TODO: ALSO ADD `PREVIEW-DROP_IMAGES`
    const [file, setFile] = useState(null);
    const label = file ? file : "Click or drop your CSV file here";
    const sellerId = localStorage.getItem("sellerId");
    const bulkAdd = async () => {
      // setAddingProduct(true);
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file); // Assuming you're sending the file as "file"

      try {
        await axios.post(
          `${API_URL}/api/v1/sellers/${sellerId}/products/import`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // setAddingProduct(false);
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <div className="flex">
        <StyledDropZone
          onDrop={setFile}
          label={label}
          className="flex-1 flex justify-center h-1 items-center rounded-md bg-inherit border-black border-[1px]"
        />
        {file && (
          <>
            <button onClick={bulkAdd}>Submit</button>
            <button
              onClick={() => {
                setFile(null);
              }}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    );
  };

  const handleExport = () => {
    setIsExportClicked(true);
    if (apiRef.current) {
      apiRef.current.exportDataAsCsv();
    }
    setIsExportClicked(false);
  };
  const handleModifyProduct = () => {
    setIsModifyingProduct(true);
  };
  return (
    <div className="w-[85vw]">
      <DeleteDialog
        selectedRows={selectedRows}
        open={open}
        setOpen={setOpen}
        sellerId={sellerId}
        deletingProduct={deletingProduct}
        setDeletingProduct={setDeletingProduct}
      />
      <ModifyDialog
        selectedRows={selectedRows}
        isModifyingProduct={isModifyingProduct}
        setIsModifyingProduct={setIsModifyingProduct}
      />

      <div className="bg-white px-4 py-2 rounded-sm border border-gray-200 flex flex-1 text-gray-200">
        <div className="p-1 flex-1 flex gap-8 text-black">
          <button
            className="p-3 px-5 rounded-lg flex justify-center items-center gap-2 border-black border  duration-150 hover:border-emerald-500"
            onClick={handleExport}
          >
            <MdOutlineFileUpload />
            Export
          </button>
          <button
            className="p-3 px-5 rounded-lg flex justify-center items-center gap-2 border-black border  duration-150 hover:border-emerald-500"
            onClick={() => {
              setIsImportOpen(true);
            }}
          >
            <MdOutlineFileDownload />
            Import
          </button>
          {isImportOpen && <ImageDrop />}
        </div>
        <div className="p-1 flex-1 flex justify-end gap-8">
          <button
            className="p-3 bg-slate-400 rounded-lg flex justify-center items-center gap-2"
            onClick={handleModifyProduct}
          >
            <FiEdit />
            Modify Product
          </button>
          <button
            className="p-3 bg-red-500 rounded-lg flex justify-center items-center gap-2"
            onClick={() => {
              selectedRows.length > 0 && setOpen(true);
            }}
          >
            <RiDeleteBin6Line />
            Delete
          </button>
          <button
            className="p-3 bg-emerald-500 rounded-lg flex justify-center items-center gap-2"
            onClick={() => setAddingProduct(true)}
          >
            <GoPlus />
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
