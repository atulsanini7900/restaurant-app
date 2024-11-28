// // "use client";
// // import { useEffect, useState } from "react";
// // import CustomerHeader from "../_components/CustomerHeader";
// // import RestaurantFooter from "../_components/RestaurantFooter";

// // const Page = () => {
// //   const [myOrders, setMyOrders] = useState([]);

// //   useEffect(() => {
// //     getMyOrders();
// //   }, []);
// //   const getMyOrders = async () => {
// //     const userStorage = JSON.parse(localStorage.getItem("user"));
// //     let response = await fetch(
// //       "http://localhost:3000/api/orders?id=" + userStorage._id
// //     );
// //     response = await response.json();
// //     if (response.success) {
// //       setMyOrders(response.results);
// //     }
// //   };

// //   return (
// //     <div>
// //       <CustomerHeader />
// //       {myOrders.map((item) => (
// //         <div
// //           className="restaurant-wrapper"
// //           style={{ marginLeft: "auto", marginRight: "auto" }}
// //         >
// //           <h4>Name {item.data.restaurantName}</h4>
// //           <div>Amount {item.amount}</div>
// //           <div>Address {item?.data?.address}</div>
// //           <div>Status {item.status}</div>
// //         </div>
// //       ))}
// //       <RestaurantFooter />
// //     </div>
// //   );
// // };
// // export default Page;



// "use client";
// import { useEffect, useState } from "react";
// import CustomerHeader from "../_components/CustomerHeader";
// import RestaurantFooter from "../_components/RestaurantFooter";

// const Page = () => {
//   const [myOrders, setMyOrders] = useState([]);

//   useEffect(() => {
//     // Ensure `getMyOrders` is only called in the browser
//     if (typeof window !== "undefined") {
//       getMyOrders();
//     }
//   }, []);

//   const getMyOrders = async () => {
//     try {
//       const userStorage = JSON.parse(localStorage.getItem("user") || "{}");
//       if (!userStorage._id) {
//         console.error("User ID not found in localStorage.");
//         return;
//       }

//       const response = await fetch(
//         `http://localhost:3000/api/orders?id=${userStorage._id}`
//       );
//       const data = await response.json();

//       if (data.success) {
//         setMyOrders(data.results);
//       } else {
//         console.error("Failed to fetch orders:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   return (
//     <div>
//       <CustomerHeader />
//       {myOrders.length > 0 ? (
//         myOrders.map((item, index) => (
//           <div
//             key={index}
//             className="restaurant-wrapper"
//             style={{ marginLeft: "auto", marginRight: "auto" }}
//           >
//             <h4>Name: {item?.data?.restaurantName || "N/A"}</h4>
//             <div>Amount: {item.amount}</div>
//             <div>Address: {item?.data?.address || "N/A"}</div>
//             <div>Status: {item.status}</div>
//           </div>
//         ))
//       ) : (
//         <p>No orders found.</p>
//       )}
//       <RestaurantFooter />
//     </div>
//   );
// };

// export default Page;


"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";

export const dynamic = "force-dynamic";

const Page = () => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      getMyOrders();
    }
  }, []);

  const getMyOrders = async () => {
    try {
      const userStorage = JSON.parse(localStorage.getItem("user") || "{}");
      if (!userStorage._id) {
        console.error("User ID not found in localStorage.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/orders?id=${userStorage._id}`
      );
      const data = await response.json();

      if (data.success) {
        setMyOrders(data.results);
      } else {
        console.error("Failed to fetch orders:", data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div>
      <CustomerHeader />
      {myOrders.length > 0 ? (
        myOrders.map((item, index) => (
          <div
            key={index}
            className="restaurant-wrapper"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <h4>Name: {item?.data?.restaurantName || "N/A"}</h4>
            <div>Amount: {item.amount}</div>
            <div>Address: {item?.data?.address || "N/A"}</div>
            <div>Status: {item.status}</div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
      <RestaurantFooter />
    </div>
  );
};

export default Page;
