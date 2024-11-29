import { format } from "date-fns";
import { Link } from "react-router-dom";
import { getOrderStatus } from "../lib/helpers";
import axios from "axios";
import { useEffect, useState } from "react";

const RecentOrders = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const sellerId = localStorage.getItem("sellerId");
  const [recentOrderData, setRecentOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Call the API to get all products for a seller
        const response = await axios.get(
          `${API_URL}/api/v1/sellers/${sellerId}/recent-orders/8`
        );
        setRecentOrderData(response.data.recentOrders); // Assuming the API returns products under 'products'
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
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Recent Orders</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product ID</th>
              <th>Customer Name</th>
              <th>Order Date</th>
              <th>Quantity</th>
              <th>Order Total</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrderData.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link to={`/order/${order.id}`}>#{order.id}</Link>
                </td>
                <td>
                  {/* <Link to={`/product/${order.product.name}`}>#{order.product}</Link> */}
                  <Link to={`/product/${order.product.id}`}>
                    {order.product.name}
                  </Link>
                </td>
                <td>
                  <Link to={`/customer/${order.consumer._id}`}>
                    {order.consumer.name}
                  </Link>
                </td>
                <td>{format(new Date(order.orderedAt), "dd MMM yyyy")}</td>
                <td>{order.quantity}</td>
                <td>{order.totalPrice}</td>
                {/* <td>{order.shipment_address}</td> */}{" "}
                {/*TODO: ADD SHIPMENT ADDRESS;*/}
                <td className="">{getOrderStatus(order.status)}</td>
                {/* <td>Test</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
