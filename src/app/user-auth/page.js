"use client";
import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantHeader from "../_components/RestaurantHeader";
import UserLogin from "../_components/UserLogin";
import UserSignUp from "../_components/UserSignUp";

const Page = (props) => {
  const [login, setLogin] = useState(true);

  return (
    <div className="container">
      <CustomerHeader />
      <h1>{login ? "User Login" : "User Signup"}</h1>
      {login ? (
        <UserLogin redirect={props.searchParams} />
      ) : (
        <UserSignUp redirect={props.searchParams} />
      )}

      <button className="button-switch" onClick={() => setLogin(!login)}>
        {login ? `Don not have account? Signup` : `Already have Account? Login`}
      </button>
    </div>
  );
};
export default Page;
