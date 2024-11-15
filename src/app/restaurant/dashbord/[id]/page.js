"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditFoodItem = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [discription, setDiscription] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    handleApiData();
  }, []);

  const handleApiData = async () => {
    let response = await fetch(
      `http://localhost:3000/api/restaurant/foods/edit/${props.params.id}`
    );
    response = await response.json();
    if (response.success) {
      setName(response.result.name);
      setPrice(response.result.price);
      setDiscription(response.result.discription);
      setPath(response.result.img_path);
    }
  };

  const handleClick = async () => {
    if (!name || !price || !path || !discription) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
    let response = await fetch(
      `http://localhost:3000/api/restaurant/foods/edit/${props.params.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          name,
          price,
          img_path: path,
          discription,
        }),
      }
    );
    response = await response.json();

    if (response.success) {
      alert("Food item Updated");
      router.push("../dashbord");
    } else {
      alert("Food Item Not Updated");
    }
  };
  return (
    <div className="container">
      <h1>Edit Food Item</h1>
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
          Update Food Item
        </button>
      </div>
      <div className="input-wrapper">
        <button
          onClick={() => router.push("../dashbord")}
          className="login-button"
        >
          Back to Food Item List
        </button>
      </div>
    </div>
  );
};

export default EditFoodItem;
