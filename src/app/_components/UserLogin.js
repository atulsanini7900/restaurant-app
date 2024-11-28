// import { useRouter } from "next/navigation";
// import { useState } from "react";

// const UserLogin = (props) => {
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const [error, setError] = useState(false);
//   const router = useRouter();

//   const handleClick = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       setError(true);
//       return false;
//     } else {
//       setError(false);
//     }

//     try {
//       const response = await fetch("http://localhost:3000/api/user", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password, login: true }),
//       });

//       const data = await response.json();

//       if (data.success && data.result) {
//         const { result } = data;
//         delete result.password;
//         localStorage.setItem("user", JSON.stringify(data.result));
//         if (props.redirect.order) {
//           router.push("/order");
//         } else {
//           router.push("/");
//         }
//       } else {
//         alert("Login Failed");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//     }
//   };

//   return (
//     <>
//       <div>
//         <div className="input-wrapper">
//           <input
//             type="email"
//             placeholder="Enter Your Email"
//             className="input-field"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           {error && !email && (
//             <span className="input-error">Please Enter Valid Email</span>
//           )}
//         </div>
//         <div className="input-wrapper">
//           <input
//             type="password"
//             placeholder="Enter Your Password"
//             className="input-field"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {error && !password && (
//             <span className="input-error">Please Enter Valid Password</span>
//           )}
//         </div>
//         <div className="input-wrapper">
//           <button onClick={handleClick} className="login-button">
//             Login
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserLogin;


"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserLogin = ({ redirect = { order: false } }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, login: true }),
      });

      const data = await response.json();

      if (data.success && data.result) {
        const { result } = data;
        delete result.password; // Ensure password is not stored
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(result));
        }
        if (redirect.order) {
          router.push("/order");
        } else {
          router.push("/");
        }
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="input-wrapper">
        <input
          type="email"
          placeholder="Enter Your Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && !email && (
          <span className="input-error">Please enter a valid email.</span>
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
          <span className="input-error">Please enter your password.</span>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="input-wrapper">
        <button
          onClick={handleClick}
          className="login-button"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
