"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DeliveryHeader = () => {
  const [details, setDetails] = useState();

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

        {details ? (
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

export default DeliveryHeader;
