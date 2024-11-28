import { useRouter } from "next/navigation";
import { useState } from "react";

const PartnerLogin = (props) => {
  const [contactNo, setContactNo] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async (e) => {
    e.preventDefault();
    if (!contactNo || !password) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/deliverypartners/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contactNo, password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        const { result } = data;
        delete result.password;
        if (typeof window !== "undefined") {
        localStorage.setItem("partner", JSON.stringify(data.result));
        }
        router.push("/deliverydashbord");
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div>
        <div className="input-wrapper">
          <input
            type="number"
            placeholder="Enter Your Mobile No."
            className="input-field"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
          />
          {error && !contactNo && (
            <span className="input-error">Please Enter Valid Mobile No.</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Enter Your Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && !password && (
            <span className="input-error">Please Enter Valid Password</span>
          )}
        </div>
        <div className="input-wrapper">
          <button onClick={handleClick} className="login-button">
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default PartnerLogin;
