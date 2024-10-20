"use client";
import React, { useState } from "react";
import RestaurantLogin from "../_components/restaurantLogin";
import RestaurantSignup from "../_components/restaurantSignup";
import RestaurantHeader from "../_components/RestaurantHeader";
import "./style.css"
import RestaurantFooter from "../_components/RestaurantFooter";
const Restaurant = () => {
  const [login, setLogin] = useState(true);
  return (
    <>
      <div className="container">
        <RestaurantHeader/>
        <h1>Restaurant Login/Signup Page</h1>
        {login ? <RestaurantLogin /> : <RestaurantSignup />}

        <button className="button-switch" onClick={() => setLogin(!login)}>
          {login
            ? `Don not have account? Signup`
            : `Already have Account? Login`}
        </button>
      </div>
      <div>
        <RestaurantFooter/>
      </div>
    </>
  );
};

export default Restaurant;
