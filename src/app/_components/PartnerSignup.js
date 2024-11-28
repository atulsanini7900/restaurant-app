import { useRouter } from "next/navigation";
import { useState } from "react";

const PartnerSignUp = (props) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [formData, setFormData] = useState({
    contactNo: "",
    password: "",
    conPassword: "",
    name: "",
    city: "",
    address: "",
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

    let response = await fetch(
      "http://localhost:3000/api/deliverypartners/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactNo: formData.contactNo,
          password: formData.password,
          name: formData.name,
          city: formData.city,
          address: formData.address,
        }),
      }
    );
    response = await response.json();
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("partner", JSON.stringify(result));

      router.push("/deliverydashbord");
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
        <button className="login-button" onClick={handleForm}>
          Signup
        </button>
      </div>
    </div>
  );
};
export default PartnerSignUp;
