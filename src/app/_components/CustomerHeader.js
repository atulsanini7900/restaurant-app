import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader = (props) => {
  const userStorage = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(userStorage ? userStorage : undefined);
  const [cartNumber, setCartNumber] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
      setCartNumber(cartStorage.length);
      setCartItem(cartStorage);
    }
  }, []);
  useEffect(() => {
    if (props.cartData) {
      if (cartNumber) {
        if (cartItem[0]?.resto_id != props.cartData.resto_id) {
          localStorage.removeItem("cart");
          setCartNumber(1);
          setCartItem([props.cartData]);
          localStorage.setItem("cart", JSON.stringify([props.cartData]));
        } else {
          let localCartItem = cartItem;
          localCartItem.push(JSON.parse(JSON.stringify(props.cartData)));
          setCartItem(localCartItem);
          setCartNumber(cartNumber + 1);
          localStorage.setItem("cart", JSON.stringify(localCartItem));
        }
      } else {
        setCartNumber(1);
        setCartItem([props.cartData]);
        localStorage.setItem("cart", JSON.stringify([props.cartData]));
      }
    }
  }, [props.cartData]);
  useEffect(() => {
    if (props.removeCartData) {
      let localCartItem = cartItem?.filter((item) => {
        return item._id != props.removeCartData;
      });
      setCartItem(localCartItem);
      setCartNumber(cartNumber - 1);
      localStorage.setItem("cart", JSON.stringify(localCartItem));
      if (localCartItem.length == 0) {
        localStorage.removeItem("cart");
      }
    }
  }, [props.removeCartData]);
  useEffect(() => {
    if (props.removeCartData) {
      setCartItem([]);
      setCartNumber(0);
      localStorage.removeItem("cart");
    }
  }, [props.removeCartData]);

  const logoutHandle = () => {
    localStorage.removeItem("user");
    setUser(undefined); // Update state
    router.push("/user-auth");
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
            Cart({cartNumber ? cartNumber : 0})
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
