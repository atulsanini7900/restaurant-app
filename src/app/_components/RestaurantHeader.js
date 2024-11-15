"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RestaurantHeader = () => {
  const [details, setDetails] = useState();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const data = localStorage.getItem("restaurantUser");
    if (!data && pathName === "/restaurant/dashbord") {
      return router.push("/restaurant");
    } else if (data && pathName === "/restaurant") {
      return router.push("/restaurant/dashbord");
    } else {
      setDetails(JSON.parse(data));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("restaurantUser");
    router.push("/restaurant");
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

        {details && details.restaurantName ? (
          <>
            <li>
              <Link href="/">Profile</Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/">Login/Signup</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default RestaurantHeader;
