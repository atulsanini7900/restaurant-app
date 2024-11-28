"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import { DELEVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
  const [cartStorage, setCartStorage] = useState(null);
  const [userStorage, setUserStorage] = useState(null); // Initialize user state
  const [removeCartData, setRemoveCartData] = useState(false);
  const router = useRouter();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Safely access localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      setUserStorage(user);

      const cart = JSON.parse(localStorage.getItem("cart"));
      setCartStorage(cart);
    }
  }, []);

  useEffect(() => {
    const totalCal = () => {
      if (cartStorage && cartStorage.length > 0) {
        return cartStorage.length === 1
          ? cartStorage[0]?.price
          : cartStorage.reduce((a, b) => a.price + b.price);
      }
      return 0; // Default value if cart is empty or not set
    };

    setTotal(totalCal());
  }, [cartStorage]);

  const orderNow = async () => {
    const user_Id = JSON.parse(localStorage.getItem("user"))._id;
    const city = JSON.parse(localStorage.getItem("user")).city;

    const cart = JSON.parse(localStorage.getItem("cart"));
    let foodItemIds = cart.map((item) => item._id).toString();
    let resto_id = cart[0].resto_id;
    let deliveryBoyResponse = await fetch(
      "http://localhost:3000/api/deliverypartners/" + city
    );
    deliveryBoyResponse = await deliveryBoyResponse.json();
    let deleveryBoy_Ids = deliveryBoyResponse.result.map((item) => item._id);
    let deleveryBoy_Id =
      deleveryBoy_Ids[Math.floor(Math.random() * deleveryBoy_Ids.length)];
    console.log("delivery", deleveryBoy_Id);
    if (!deleveryBoy_Id) {
      alert("Delivery Boy not available");
      return false;
    }
    let status = "confirm";
    let amount = total;
    const collection = {
      user_Id,
      foodItemIds,
      resto_id,
      status,
      amount,
      deleveryBoy_Id,
    };

    let response = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      body: JSON.stringify(collection),
    });
    response = await response.json();
    if (response.success) {
      alert("Order Confirmed");
      setRemoveCartData(true);
      router.push("/myprofile");
    } else {
      alert("Order not Confirmed");
    }
  };

  return (
    <div>
      <CustomerHeader removeCartData={removeCartData} />

      <div className="total-wrapper">
        <div className="block-1">
          <h2>User Details</h2>

          <div className="row">
            <span>Name: </span>
            <span>{userStorage?.name}</span>
          </div>
          <div className="row">
            <span>Address: </span>
            <span>{userStorage?.address}</span>
          </div>
          <div className="row">
            <span>Phone Number: </span>
            <span>{userStorage?.contactNo}</span>
          </div>
          <h2>Amount Details</h2>

          <div className="row">
            <span>Food Charges: </span>
            <span>{total}</span>
          </div>
          <div className="row">
            <span>Total Tax: </span>
            <span>{(total * TAX) / 100}</span>
          </div>
          <div className="row">
            <span>Delevery Charges: </span>
            <span>{DELEVERY_CHARGES}</span>
          </div>
          <div className="row">
            <span>Total Price: </span>
            <span>{total + DELEVERY_CHARGES + (total * TAX) / 100}</span>
          </div>
          <h2>Payment Methods</h2>

          <div className="row">
            <span>Cash on Delevery: </span>
            <span>{total + DELEVERY_CHARGES + (total * TAX) / 100}</span>
          </div>
        </div>
        <div className="block-2">
          <button onClick={orderNow}>Place your Order Now</button>
        </div>
      </div>

      <RestaurantFooter />
    </div>
  );
};
export default Page;
