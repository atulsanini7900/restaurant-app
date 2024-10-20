import React from 'react'

const RestaurantSignup = () => {
  return (
    <>
        <div >
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
          <input
            type="password"
            placeholder="Confirm Your Password"
            className="input-field"
          />
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Restaurant Name"
            className="input-field"
          />
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter City"
            className="input-field"
          />
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Full Address"
            className="input-field"
          />
        </div>
        <div className="input-wrapper">
          <input
            type="number"
            placeholder="Enter Contact No."
            className="input-field"
          />
        </div>
        <div className="input-wrapper">
          <button className="login-button">Signup</button>
        </div>
      </div>
    </>
  )
}

export default RestaurantSignup;