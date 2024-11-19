"use client";
import CustomerHeader from "@/app/_components/CustomerHeader";
import RestaurantFooter from "@/app/_components/RestaurantFooter";
import { useEffect, useState } from "react";

const Page = (props) => {
  const [restaurantDetails, setRestaurantDetails] = useState();
  const [foodItems, setFoodItems] = useState([]);
  const [cartData, setCartData] = useState();

  useEffect(() => {
    loadRestaurantDetails();
  }, []);

  const loadRestaurantDetails = async () => {
    const id = props.searchParams.id;
    let response = await fetch("http://localhost:3000/api/customer/" + id);
    response = await response.json();
    if (response.success) {
      setRestaurantDetails(response.details);
      setFoodItems(response.foodItems);
    }
  };

  const addToCart = (item) => {
    setCartData(item);
  };

  return (
    <div>
      <CustomerHeader cartData={cartData} />
      <div className="main-page-banner">
        <h1>{decodeURI(props.params.name)}</h1>
      </div>
      <div className="details-wrapper">
        <h4>Contact: {restaurantDetails?.contactNo}</h4>
        <h4>City: {restaurantDetails?.city}</h4>
        <h4>Address: {restaurantDetails?.address}</h4>
        <h4>Email: {restaurantDetails?.email}</h4>
      </div>
      <div className="food-item-wrapper">
        {foodItems.length > 0 ? (
          foodItems.map((item) => (
            <div className="list-items">
              <div>
                <img style={{ width: 100 }} src={item.img_path} />
              </div>
              <div>
                <div>{item.name}</div>
                <div>{item.price}</div>
                <div className="description">{item.discription}</div>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </div>
            </div>
          ))
        ) : (
          <h1>No Food Item Added for Now</h1>
        )}
      </div>
      <RestaurantFooter />
    </div>
  );
};

export default Page;
