import React from "react";

const RestaurantLogin = () => {
  return (
    <>
      <div className="container">
        <div className="input-wrapper">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="input-field"
          />
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Enter Your Password"
            className="input-field"
          />
        </div>
        <div className="input-wrapper">
          <button className="input-field">Login</button>
        </div>
      </div>
    </>
  );
};

export default RestaurantLogin;
