import FilterBar from "./FilterBar";
import OrdersList from "./OrdersList";

const Orders = () => {
  return (
    <div className={`w-full h-full gap-8 relative overflow-x-hidden`}>
      <div className="w-full h-full z-30 flex flex-col gap-6">
        <div className="font-bold font-serif text-2xl px-1">
          <h1>Orders</h1>
        </div>
        <div className="flex flex-col gap-4">
          {/* <ActionBar addingProduct={addingProduct} setAddingProduct={setAddingProduct}/>
				<FilterBar/>
				<ProductsList/> */}
          <FilterBar />
          <OrdersList />
        </div>
      </div>
    </div>
  );
};

export default Orders;
