// "use client";
// import { useEffect, useState } from "react";
// import CustomerHeader from "../_components/CustomerHeader";
// import RestaurantFooter from "../_components/RestaurantFooter";
// import { DELEVERY_CHARGES, TAX } from "../lib/constant";
// import { useRouter } from "next/navigation";

// const Page = () => {
//   const [cartStorage, setCartStorage] = useState(null);
//   const [total, setTotal] = useState(0);
//   useEffect(() => {
//     const storedCart = localStorage?.getItem("cart");
//     setCartStorage(storedCart ? JSON.parse(storedCart) : []);
//   }, []);
//   const router = useRouter();

//   useEffect(() => {
//     const totalCal = () => {
//       if (cartStorage && cartStorage.length > 0) {
//         return cartStorage.length === 1
//           ? cartStorage[0]?.price
//           : cartStorage.reduce((a, b) => a.price + b.price);
//       }
//       return 0; // Default value if cart is empty or not set
//     };

//     setTotal(totalCal());
//   }, [cartStorage]);

//   const orderNow = () => {
//     if (JSON.parse(localStorage.getItem("user"))) {
//       router.push("/order");
//     } else {
//       router.push("/user-auth?order=true");
//     }
//   };

//   return (
//     <div>
//       <CustomerHeader />

//       <div className="food-item-wrapper">
//         {cartStorage?.length > 0 ? (
//           cartStorage.map((item) => (
//             <div className="list-items">
//               <div className="list-item-block-1">
//                 <img style={{ width: 100 }} src={item.img_path} />
//               </div>
//               <div className="list-item-block-2">
//                 <div>{item.name}</div>
//                 <div className="description">{item.discription}</div>

//                 <button onClick={() => removeFromCart(item._id)}>
//                   Remove form Cart
//                 </button>
//               </div>
//               <div className="list-item-block-3">Price: {item.price}</div>
//             </div>
//           ))
//         ) : (
//           <h1>No Food Item Added for Now</h1>
//         )}
//       </div>
//       <div className="total-wrapper">
//         <div className="block-1">
//           <div className="row">
//             <span>Food Charges: </span>
//             <span>{total}</span>
//           </div>
//           <div className="row">
//             <span>Total Tax: </span>
//             <span>{(total * TAX) / 100}</span>
//           </div>
//           <div className="row">
//             <span>Delevery Charges: </span>
//             <span>{DELEVERY_CHARGES}</span>
//           </div>
//           <div className="row">
//             <span>Total Price: </span>
//             <span>{total + DELEVERY_CHARGES + (total * TAX) / 100}</span>
//           </div>
//         </div>
//         <div className="block-2">
//           <button onClick={orderNow}>Order Now</button>
//         </div>
//       </div>

//       <RestaurantFooter />
//     </div>
//   );
// };
// export default Page;

"use client";
import { useEffect, useState, useCallback } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import { DELEVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
  const [cartStorage, setCartStorage] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedCart = localStorage.getItem("cart");
        setCartStorage(storedCart ? JSON.parse(storedCart) : []);
      } catch (error) {
        console.error("Failed to parse cart data from localStorage", error);
        setCartStorage([]);
      }
    }
  }, []);

  const calculateTotal = useCallback(() => {
    if (cartStorage.length > 0) {
      return cartStorage.reduce((sum, item) => sum + item.price, 0);
    }
    return 0;
  }, [cartStorage]);

  useEffect(() => {
    setTotal(calculateTotal());
  }, [cartStorage, calculateTotal]);

  const orderNow = () => {
    if (typeof window !== "undefined" && localStorage.getItem("user")) {
      router.push("/order");
    } else {
      router.push("/user-auth?order=true");
    }
  };

  const removeFromCart = (itemId) => {
    if (typeof window !== "undefined") {
      const updatedCart = cartStorage.filter((item) => item._id !== itemId);
      setCartStorage(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  return (
    <div>
      <CustomerHeader />
      <div className="food-item-wrapper">
        {cartStorage.length > 0 ? (
          cartStorage.map((item) => (
            <div className="list-items" key={item._id}>
              <div className="list-item-block-1">
                <img style={{ width: 100 }} src={item.img_path} alt={item.name} />
              </div>
              <div className="list-item-block-2">
                <div>{item.name}</div>
                <div className="description">{item.description}</div>
                <button onClick={() => removeFromCart(item._id)}>
                  Remove from Cart
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
            <span>{((total * TAX) / 100).toFixed(2)}</span>
          </div>
          <div className="row">
            <span>Delivery Charges: </span>
            <span>{DELEVERY_CHARGES}</span>
          </div>
          <div className="row">
            <span>Total Price: </span>
            <span>
              {(
                total +
                DELEVERY_CHARGES +
                (total * TAX) / 100
              ).toFixed(2)}
            </span>
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
