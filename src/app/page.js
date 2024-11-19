"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import RestaurantFooter from "./_components/RestaurantFooter";
import { useRouter } from "next/navigation";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const [restaurant, setRastaurant] = useState([]);
  const router = useRouter();

  useEffect(() => {
    searchLocation();
    loadRestaurant();
  }, []);
  const searchLocation = async () => {
    let response = await fetch("http://localhost:3000/api/customer/locations");
    response = await response.json();
    if (response.success) {
      setLocations(response.result);
    }
  };
  const loadRestaurant = async (params) => {
    let url = "http://localhost:3000/api/customer";
    if (params?.location) {
      url = url + "?location=" + params.location;
    } else if (params?.restaurant) {
      url = url + "?restaurant=" + params.restaurant;
    }
    let response = await fetch(url);
    response = await response.json();
    if (response.success) {
      setRastaurant(response.result);
    }
  };

  function handleSelectLocation(item) {
    setSelectedLocation(item);
    setShowLocation(false);
    loadRestaurant({ location: item });
  }
  return (
    <main>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food Delevery App</h1>
        <div className="input-wrapper">
          <input
            type="text"
            onClick={() => setShowLocation(true)}
            value={selectedLocation}
            className="select-input"
            placeholder="Select Place"
          />
          <ul className="search-location">
            {showLocation &&
              locations?.map((item, key) => (
                <li key={key} onClick={() => handleSelectLocation(item)}>
                  {item}
                </li>
              ))}
          </ul>

          <input
            type="text"
            className="search-input"
            onChange={(event) =>
              loadRestaurant({ restaurant: event.target.value })
            }
            placeholder="Enter Food or Restaurant Name"
          />
        </div>
      </div>
      <div className="restaurant-list-container">
        {restaurant.map((restoData, key) => (
          <div
            onClick={() =>
              router.push(
                "explore/" + restoData.restaurantName + "?id=" + restoData._id
              )
            }
            className="restaurant-wrapper"
          >
            <div key={key} className="heading-warapper">
              <h3>{restoData.restaurantName}</h3>
              <h5>Contact: {restoData.contactNo}</h5>
            </div>
            <div className="address-wrapper">
              <div>{restoData.city}</div>
              <div className="address">
                {restoData.address}, Email: {restoData.email}
              </div>
            </div>
          </div>
        ))}
      </div>
      <RestaurantFooter />
    </main>
  );
}
