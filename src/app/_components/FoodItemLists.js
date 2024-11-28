import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FoodItemList = () => {
  const [foodItem, setFoodItem] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadFoodItems();
  }, []);

  const loadFoodItems = async () => {
    if (typeof window !== "undefined") {
    const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
    }
    const resto_id = restaurantData._id;
    let response = await fetch(
      `http://localhost:3000/api/restaurant/foods/${resto_id}`
    );
    response = await response.json();

    if (response) {
      setFoodItem(response.result);
    } else {
      alert("food item not loding");
    }
  };

  const deleteFoodItem = async (id) => {
    let response = await fetch(
      `http://localhost:3000/api/restaurant/foods/${id}`,
      {
        method: "DELETE",
      }
    );
    response = await response.json();
    if (response.success) {
      loadFoodItems();
    } else {
      alert("Item not Deleted");
    }
  };
  return (
    <>
      <h1>Food ITems</h1>
      <table>
        <thead>
          <tr>
            <td>S.N</td>
            <td>Name</td>
            <td>Price</td>
            <td>Image</td>
            <td>Discription</td>
            <td>Operations</td>
          </tr>
        </thead>
        <tbody>
          {foodItem.map((item, key) => (
            <tr>
              <td>{key + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <img src={item.img_path} />
              </td>
              <td>{item.discription}</td>
              <td>
                <button onClick={() => deleteFoodItem(item._id)}>Delete</button>
                <button onClick={() => router.push(`dashbord/${item._id}`)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default FoodItemList;
