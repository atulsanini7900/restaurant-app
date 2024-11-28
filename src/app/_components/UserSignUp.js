import { useRouter } from "next/navigation";
import { useState } from "react";

const UserSignUp = (props) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    conPassword: "",
    name: "",
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
      !formData?.name ||
      !formData?.city ||
      !formData?.address ||
      !formData?.contactNo
    ) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    let response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        city: formData.city,
        address: formData.address,
        contactNo: formData.contactNo,
      }),
    });
    response = await response.json();
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("user", JSON.stringify(result));
      if (props.redirect.order) {
        router.push("/order");
      } else {
        router.push("/");
      }
    }
  };
  return (
    <div>
      <div className="input-wrapper">
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          className="input-field"
          value={formData.name}
          onChange={handleChange}
        />
        {error && !formData.name && (
          <span className="input-error">Please Enter Your Valid Name</span>
        )}
      </div>
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
          <span className="input-error">Please Enter Valid Contact Number</span>
        )}
      </div>
      <div className="input-wrapper">
        <button className="login-button" onClick={handleForm}>
          Signup
        </button>
      </div>
    </div>
  );
};
export default UserSignUp;
