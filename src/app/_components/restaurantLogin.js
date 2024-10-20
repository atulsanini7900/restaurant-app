

const RestaurantLogin = () => {
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
          <button className="login-button">Login</button>
        </div>
      </div>
    </>
  );
};

export default RestaurantLogin;
