// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const CustomerHeader = (props) => {
//   const userStorage = JSON.parse(localStorage.getItem("user"));
//   const [user, setUser] = useState(userStorage ? userStorage : undefined);
//   const [cartNumber, setCartNumber] = useState(0);
//   const [cartItem, setCartItem] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
//       setCartNumber(cartStorage.length);
//       setCartItem(cartStorage);
//     }
//   }, []);
//   useEffect(() => {
//     if (props.cartData) {
//       if (cartNumber) {
//         if (cartItem[0]?.resto_id != props.cartData.resto_id) {
//           localStorage.removeItem("cart");
//           setCartNumber(1);
//           setCartItem([props.cartData]);
//           localStorage.setItem("cart", JSON.stringify([props.cartData]));
//         } else {
//           let localCartItem = cartItem;
//           localCartItem.push(JSON.parse(JSON.stringify(props.cartData)));
//           setCartItem(localCartItem);
//           setCartNumber(cartNumber + 1);
//           localStorage.setItem("cart", JSON.stringify(localCartItem));
//         }
//       } else {
//         setCartNumber(1);
//         setCartItem([props.cartData]);
//         localStorage.setItem("cart", JSON.stringify([props.cartData]));
//       }
//     }
//   }, [props.cartData]);
//   useEffect(() => {
//     if (props.removeCartData) {
//       let localCartItem = cartItem?.filter((item) => {
//         return item._id != props.removeCartData;
//       });
//       setCartItem(localCartItem);
//       setCartNumber(cartNumber - 1);
//       localStorage.setItem("cart", JSON.stringify(localCartItem));
//       if (localCartItem.length == 0) {
//         localStorage.removeItem("cart");
//       }
//     }
//   }, [props.removeCartData]);
//   useEffect(() => {
//     if (props.removeCartData) {
//       setCartItem([]);
//       setCartNumber(0);
//       localStorage.removeItem("cart");
//     }
//   }, [props.removeCartData]);

//   const logoutHandle = () => {
//     localStorage.removeItem("user");
//     setUser(undefined); // Update state
//     router.push("/user-auth");
//   };

//   return (
//     <div className="header-wrapper">
//       <div>
//         <img
//           style={{ width: 100 }}
//           src="https://marketplace.canva.com/EAFaFUz4aKo/2/0/1600w/canva-yellow-abstract-cooking-fire-free-logo-JmYWTjUsE-Q.jpg"
//         />
//       </div>
//       <ul>
//         <li>
//           <Link href="/">Home</Link>
//         </li>
//         {user ? (
//           <>
//             <li>
//               <Link href="/myprofile">{user.name}</Link>
//             </li>
//             <li>
//               <button onClick={logoutHandle}>Logout</button>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               <Link href="/user-auth">Login</Link>
//             </li>
//             <li>
//               <Link href="/user-auth">Signup</Link>
//             </li>
//           </>
//         )}
//         <li>
//           <Link href={cartNumber ? "/cart" : "#"}>
//             Cart({cartNumber ? cartNumber : 0})
//           </Link>
//         </li>
//         <li>
//           <Link href="/">Add Restaurant</Link>
//         </li>
//         <li>
//           <Link href="/deliverypartner">Delivery Partner</Link>
//         </li>
//       </ul>
//     </div>
//   );
// };
// export default CustomerHeader;


import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader = (props) => {
  const [user, setUser] = useState(undefined);
  const [cartNumber, setCartNumber] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  const router = useRouter();

  // Load user data from localStorage when in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const userStorage = JSON.parse(localStorage.getItem("user"));
        setUser(userStorage || undefined);
      } catch (error) {
        console.error("Error accessing localStorage for user:", error);
        setUser(undefined);
      }
    }
  }, []);

  // Load cart data from localStorage when in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
        setCartNumber(cartStorage.length);
        setCartItem(cartStorage);
      } catch (error) {
        console.error("Error accessing localStorage for cart:", error);
        setCartNumber(0);
        setCartItem([]);
      }
    }
  }, []);

  useEffect(() => {
    if (props.cartData) {
      try {
        if (cartNumber) {
          if (cartItem[0]?.resto_id !== props.cartData.resto_id) {
            localStorage.removeItem("cart");
            setCartNumber(1);
            setCartItem([props.cartData]);
            localStorage.setItem("cart", JSON.stringify([props.cartData]));
          } else {
            const localCartItem = [...cartItem, { ...props.cartData }];
            setCartItem(localCartItem);
            setCartNumber(cartNumber + 1);
            localStorage.setItem("cart", JSON.stringify(localCartItem));
          }
        } else {
          setCartNumber(1);
          setCartItem([props.cartData]);
          localStorage.setItem("cart", JSON.stringify([props.cartData]));
        }
      } catch (error) {
        console.error("Error updating cart in localStorage:", error);
      }
    }
  }, [props.cartData]);

  useEffect(() => {
    if (props.removeCartData) {
      try {
        const localCartItem = cartItem.filter(
          (item) => item._id !== props.removeCartData
        );
        setCartItem(localCartItem);
        setCartNumber(localCartItem.length);
        if (localCartItem.length === 0) {
          localStorage.removeItem("cart");
        } else {
          localStorage.setItem("cart", JSON.stringify(localCartItem));
        }
      } catch (error) {
        console.error("Error removing cart item from localStorage:", error);
      }
    }
  }, [props.removeCartData]);

  const logoutHandle = () => {
    try {
      localStorage.removeItem("user");
      setUser(undefined); // Update state
      router.push("/user-auth");
    } catch (error) {
      console.error("Error removing user from localStorage:", error);
    }
  };

  return (
    <div className="header-wrapper">
      <div>
        <img
          style={{ width: 100 }}
          src="https://marketplace.canva.com/EAFaFUz4aKo/2/0/1600w/canva-yellow-abstract-cooking-fire-free-logo-JmYWTjUsE-Q.jpg"
        />
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link href="/myprofile">{user.name}</Link>
            </li>
            <li>
              <button onClick={logoutHandle}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/user-auth">Login</Link>
            </li>
            <li>
              <Link href="/user-auth">Signup</Link>
            </li>
          </>
        )}
        <li>
          <Link href={cartNumber ? "/cart" : "#"}>
            Cart({cartNumber || 0})
          </Link>
        </li>
        <li>
          <Link href="/">Add Restaurant</Link>
        </li>
        <li>
          <Link href="/deliverypartner">Delivery Partner</Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerHeader;
