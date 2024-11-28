import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RestaurantSignup = () => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    conPassword: "",
    restaurantName: "",
    city: "",
    address: "",
    contactNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleForm = async (e) => {
    if (formData.password !== formData.conPassword) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
    }
    if (
      !formData?.email ||
      !formData?.password ||
      !formData?.restaurantName ||
      !formData?.city ||
      !formData?.address ||
      !formData?.contactNo
    ) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    e.preventDefault();
    const result = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        restaurantName: formData.restaurantName,
        city: formData.city,
        address: formData.address,
        contactNo: formData.contactNo,
      }),
    });

    try {
      const response = await result.json();
      if (response.success) {
        const { result } = response;
        delete result.password;
        if (typeof window !== "undefined") {
        localStorage.setItem("restaurantUser", JSON.stringify(result));
        }
        router.push("/restaurant/dashbord");
      }
    } catch {
      console.log("Unexpected server response");
    }
  };

  return (
    <>
      <div>
        <div className="input-wrapper">
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            className="input-field"
            value={formData.email}
            onChange={handleChange}
          />
          {error && !formData.email && (
            <span className="input-error">Please Enter Valid Email</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
            className="input-field"
            value={formData.password}
            onChange={handleChange}
          />
          {passwordError && (
            <span className="input-error">
              Password and Confirm Password dosn't metch
            </span>
          )}
          {error && !formData.password && (
            <span className="input-error">Please Enter Valid Password</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            name="conPassword"
            placeholder="Confirm Your Password"
            className="input-field"
            value={formData.conPassword}
            onChange={handleChange}
          />
          {passwordError && (
            <span className="input-error">
              Password and Confirm Password dosn't metch
            </span>
          )}
          {error && !formData.conPassword && (
            <span className="input-error">Please Enter Valid Password</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            name="restaurantName"
            placeholder="Enter Restaurant Name"
            className="input-field"
            value={formData.restaurantName}
            onChange={handleChange}
          />
          {error && !formData.restaurantName && (
            <span className="input-error">
              Please Enter Valid Restaurant Name
            </span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            name="city"
            placeholder="Enter City"
            className="input-field"
            value={formData.city}
            onChange={handleChange}
          />
          {error && !formData.city && (
            <span className="input-error">Please Enter Valid City</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            name="address"
            placeholder="Enter Full Address"
            className="input-field"
            value={formData.address}
            onChange={handleChange}
          />
          {error && !formData.address && (
            <span className="input-error">Please Enter Valid Address</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="tel"
            name="contactNo"
            placeholder="Enter Contact No."
            className="input-field"
            value={formData.contactNo}
            onChange={handleChange}
          />
          {error && !formData.contactNo && (
            <span className="input-error">
              Please Enter Valid Contact Number
            </span>
          )}
        </div>
        <div className="input-wrapper">
          <button className="login-button" onClick={handleForm}>
            Signup
          </button>
        </div>
      </div>
    </>
  );
};

export default RestaurantSignup;
