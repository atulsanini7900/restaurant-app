import { useState } from "react";

const AddFoodItem = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [discription, setDiscription] = useState("");
  const [error, setError] = useState(false);

  const handleClick = async () => {
    if (!name || !price || !path || !discription) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    let resto_id;
    const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
    if (restaurantData) {
      resto_id = restaurantData._id;
    }
    let response = await fetch("http://localhost:3000/api/restaurant/foods", {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
        img_path: path,
        discription,
        resto_id,
      }),
    });
    response = await response.json();
    if (response.success) {
      alert("Food item Added");
      props.setAddItem(false);
    } else {
      alert("Food Item not Added");
    }
  };
  return (
    <div className="container">
      <h1>Add New Food</h1>
      <div className="input-wrapper">
        <input
          type="text"
          name="name"
          placeholder="Enter Food Name"
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && (
          <span className="input-error">Please Enter Valid Name</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="number"
          name="price"
          placeholder="Enter Food Price"
          className="input-field"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && (
          <span className="input-error">Please Enter Valid Price</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          name="name"
          placeholder="Enter Image Path"
          className="input-field"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
        {error && !path && (
          <span className="input-error">Please Enter Valid Image Path</span>
        )}
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          name="description"
          placeholder="Discription"
          className="input-field"
          value={discription}
          onChange={(e) => setDiscription(e.target.value)}
        />
        {error && !discription && (
          <span className="input-error">Please Enter Valid Discription</span>
        )}
      </div>

      <div className="input-wrapper">
        <button onClick={handleClick} className="login-button">
          Add Food Item
        </button>
      </div>
    </div>
  );
};

export default AddFoodItem;
