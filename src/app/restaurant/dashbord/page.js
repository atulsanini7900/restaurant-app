"use client";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import "./../style.css";
import { useState } from "react";
import AddFoodItem from "@/app/_components/AddFoodItem";
import FoodItemList from "@/app/_components/FoodItemLists";
const Dashbord = () => {
  const [addItem, setAddItem] = useState(false);
  return (
    <>
      <RestaurantHeader />
      <button onClick={() => setAddItem(true)}>Add Food</button>
      <button onClick={() => setAddItem(false)}>Dashbord</button>
      {addItem ? <AddFoodItem setAddItem={setAddItem} /> : <FoodItemList />}
    </>
  );
};

export default Dashbord;
