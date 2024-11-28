import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantLogin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    try {
      const response = await fetch("http://localhost:3000/api/restaurant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, login: true }),
      });

      const data = await response.json();

      if (data.success && data.result) {
        const { result } = data;
        delete result.password;
        if (typeof window !== "undefined") {
        localStorage.setItem("restaurantUser", JSON.stringify(data.result));
        }
        router.push("/restaurant/dashbord");
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
            type="email"
            placeholder="Enter Your Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && !email && (
            <span className="input-error">Please Enter Valid Email</span>
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

export default RestaurantLogin;
