import { useRef, useState } from "react";
import ActionBar from "./ActionBar";
// eslint-disable-next-line no-unused-vars
import FilterBar from "./FilterBar";
import ProductsList from "./ProductsList";
import AddProductPage from "./AddProduct/AddProductPage";

const Products = () => {
  const [addingProduct, setAddingProduct] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(false);
  const sellerId = localStorage.getItem("sellerId");
  const [selectedRows, setSelectedRows] = useState([]);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isExportClicked, setIsExportClicked] = useState(false);
  const apiRef = useRef(null);
  return (
    <div
      className={`w-full h-full gap-8 relative overflow-x-hidden ${
        addingProduct ? "overflow-y-auto" : "overflow-y-auto"
      }`}
    >
      <div
        className={`w-full z-40 pb-8 rounded-md bg-neutral-900 absolute duration-500 ${
          addingProduct ? "" : "translate-x-full"
        }`}
      >
        <AddProductPage
          addingProduct={addingProduct}
          setAddingProduct={setAddingProduct}
          isSubmitClicked={isSubmitClicked}
          setIsSubmitClicked={setIsSubmitClicked}
        />
      </div>
      <div className="w-full h-full z-30 flex flex-col gap-6">
        <div className="font-bold font-serif text-2xl px-1">
          <h1>Products</h1>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <ActionBar
            addingProduct={addingProduct}
            setAddingProduct={setAddingProduct}
            selectedRows={selectedRows}
            sellerId={sellerId}
            isExportClicked={isExportClicked}
            setIsExportClicked={setIsExportClicked}
            apiRef={apiRef}
            deletingProduct = {deletingProduct}
            setDeletingProduct = {setDeletingProduct}
          />
          <FilterBar />
          <ProductsList
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            isSubmitClicked={isSubmitClicked}
            apiRef={apiRef}
            deletingProduct = {deletingProduct}
            setDeletingProduct={setDeletingProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
