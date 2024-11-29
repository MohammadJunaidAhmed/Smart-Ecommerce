/* eslint-disable react/prop-types */
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { useEffect, useState } from 'react';


const allStatus = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

const columns = [
  { field: 'id', headerName: 'Invoice No.', width: 120},
  { field: 'orderedAt', headerName: 'Order Time', flex: 1},
  { field: 'productName', headerName: 'Product', flex: 1},
  { field: 'consumerName', headerName: 'Customer Name', width: 150},
  { field: 'method', headerName: 'Method', width: 120},
  { field: 'totalPrice', headerName: 'Amount', width: 120},
  { field: 'status', headerName: 'Status', width: 120, editable: true,type: 'singleSelect', valueOptions: allStatus},
  // { field: 'invoice', headerName: 'Invoice', type: 'boolean', flex: 1},
];

const paginationModel = { page: 0, pageSize: 10 };

const updateData = (newRow, oldRow) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const orderId = oldRow._id;
  const updatedData = {
    status: newRow.status
  };
  const updateOrder = async (orderId, updatedData) => {
    try {
      await axios.put(`${API_URL}/api/v1/orders/${orderId}`, updatedData);
    } catch (error) {
      console.error('Error updating order:', error.response ? error.response.data : error.message);
    }
  };
  updateOrder(orderId, updatedData);
}

const DataTable = ({recentOrderData}) => {
  return (
    <Paper sx={{ width: '100%' }}>
      <DataGrid
        rows={recentOrderData}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        rowHeight={60}
        checkboxSelection
        sx={{ border: 0 }}
        processRowUpdate={updateData}
      />
    </Paper>
  )
}

const flattenOrderData = (orders) => {
  return orders.map(order => ({...order, "consumerName": order.consumer.name ? order.consumer.name: 'NA' , "productName": order.product && order.product.name ? order.product.name: 'NA', "productId": order.product && order.product.id ? order.product.id : 'NA', "consumerId": order.consumer.id}));
};


const OrdersList = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const sellerId = localStorage.getItem("sellerId");
  const [recentOrderData, setRecentOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Call the API to get all products for a seller
        const response = await axios.get(`${API_URL}/api/v1/sellers/${sellerId}/orders`);
        const flattenedData = flattenOrderData(response.data.allOrders);
        setRecentOrderData(flattenedData); // Assuming the API returns products under 'products'
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error fetching Recent products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sellerId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <DataTable recentOrderData={recentOrderData}/>
  )
}

export default OrdersList