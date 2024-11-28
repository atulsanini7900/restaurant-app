"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import { DELEVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
  const [cartStorage, setCartStorage] = useState(null);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const storedCart = localStorage?.getItem("cart");
    setCartStorage(storedCart ? JSON.parse(storedCart) : []);
  }, []);
  const router = useRouter();

  useEffect(() => {
    const totalCal = () => {
      if (cartStorage && cartStorage.length > 0) {
        return cartStorage.length === 1
          ? cartStorage[0]?.price
          : cartStorage.reduce((a, b) => a.price + b.price);
      }
      return 0; // Default value if cart is empty or not set
    };

    setTotal(totalCal());
  }, [cartStorage]);

  const orderNow = () => {
    if (JSON.parse(localStorage.getItem("user"))) {
      router.push("/order");
    } else {
      router.push("/user-auth?order=true");
    }
  };

  return (
    <div>
      <CustomerHeader />

      <div className="food-item-wrapper">
        {cartStorage?.length > 0 ? (
          cartStorage.map((item) => (
            <div className="list-items">
              <div className="list-item-block-1">
                <img style={{ width: 100 }} src={item.img_path} />
              </div>
              <div className="list-item-block-2">
                <div>{item.name}</div>
                <div className="description">{item.discription}</div>

                <button onClick={() => removeFromCart(item._id)}>
                  Remove form Cart
                </button>
              </div>
              <div className="list-item-block-3">Price: {item.price}</div>
            </div>
          ))
        ) : (
          <h1>No Food Item Added for Now</h1>
        )}
      </div>
      <div className="total-wrapper">
        <div className="block-1">
          <div className="row">
            <span>Food Charges: </span>
            <span>{total}</span>
          </div>
          <div className="row">
            <span>Total Tax: </span>
            <span>{(total * TAX) / 100}</span>
          </div>
          <div className="row">
            <span>Delevery Charges: </span>
            <span>{DELEVERY_CHARGES}</span>
          </div>
          <div className="row">
            <span>Total Price: </span>
            <span>{total + DELEVERY_CHARGES + (total * TAX) / 100}</span>
          </div>
        </div>
        <div className="block-2">
          <button onClick={orderNow}>Order Now</button>
        </div>
      </div>

      <RestaurantFooter />
    </div>
  );
};
export default Page;
