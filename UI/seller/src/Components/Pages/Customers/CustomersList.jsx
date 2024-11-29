import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect } from "react";
import { useState } from "react";

const columns = [
  { field: '_id', headerName: 'Customer Id.', flex: 2},
  { field: 'name', headerName: 'Customer Name', flex: 2},
  { field: 'email', headerName: 'Customer Email', flex: 3},
];

const paginationModel = { page: 0, pageSize: 10 };

const DataTable = ({customers}) => {
  return (
    <Paper sx={{ width: '100%' }}>
      <DataGrid
        rows={customers}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        rowHeight={60}
        checkboxSelection
        sx={{ border: 0 }}
        getRowId={(row) => row._id}
      />
    </Paper>
  )
}

const CustomersList = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const sellerId = localStorage.getItem("sellerId");
  const fetchCustomers = async() => {
    try{
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/v1/sellers/${sellerId}/customers`);
      setCustomers(response.data.customers);
      setLoading(false);
    }
    catch(err){
      setError(err);
      setLoading(false);
    }
  }
  useEffect(()=>{
    fetchCustomers();
  },[])

  if(error){
    return (
      <div>
        <h1>ERROR!!</h1>
        <h1>{error}</h1>
      </div>
    )
  }
  if(loading){
    return <div>Loading...</div>;
  }
  return (
    <DataTable customers={customers}/>
  )
}

export default CustomersList