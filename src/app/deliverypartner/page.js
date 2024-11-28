"use client";
import { useEffect, useState } from "react";
import PartnerLogin from "../_components/PartnerLogin";
import PartnerSignUp from "../_components/PartnerSignup";
import { useRouter } from "next/navigation";

const Page = () => {
  const [login, setLogin] = useState(true);

  const router = useRouter();
  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem("partner"));
    if (delivery) {
      router.push("/deliverydashbord");
    }
  }, []);
  return (
    <div className="auth-container">
      <h1>Delivery Partner</h1>
      {login ? <PartnerLogin /> : <PartnerSignUp />}
      <button className="button-switch" onClick={() => setLogin(!login)}>
        {login ? `Don not have account? Signup` : `Already have Account? Login`}
      </button>
    </div>
  );
};
export default Page;
