"use client";
import { useEffect, useState } from "react";
import RestaurantFooter from "../_components/RestaurantFooter";
import { useRouter } from "next/navigation";
import DeliveryHeader from "../_components/DeliveryHeader";

const Page = () => {
  const [myOrders, setMyOrders] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem("partner"));
    if (!delivery) {
      router.push("/deliverypartner");
    }
  }, []);
  useEffect(() => {
    getMyOrders();
  }, []);
  const getMyOrders = async () => {
    const deliveryData = JSON.parse(localStorage.getItem("partner"));
    let response = await fetch(
      "http://localhost:3000/api/deliveryorders/" + deliveryData?._id
    );
    response = await response.json();
    if (response.success) {
      setMyOrders(response.results);
    }
  };

  return (
    <div>
      <DeliveryHeader />
      <h1>Delivery Dashbord Page</h1>
      {myOrders.map((item) => (
        <div
          className="restaurant-wrapper"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <h4>Name {item.data.restaurantName}</h4>
          <div>Amount {item.amount}</div>
          <div>Address {item?.data?.address}</div>
          <div>Status {item.status}</div>
          <div>
            Update Status :
            <select>
              <option>Confirm</option>
              <option>On the Way</option>
              <option>Delivered</option>
              <option>Failed to Delivery</option>
            </select>
          </div>
        </div>
      ))}
      <RestaurantFooter />
    </div>
  );
};
export default Page;
