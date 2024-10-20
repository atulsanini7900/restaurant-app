import Link from "next/link"


const RestaurantHeader = () => {
  return (
    <div className="header-wrapper">
        <div>
            <img style={{width:100}} src="https://marketplace.canva.com/EAFaFUz4aKo/2/0/1600w/canva-yellow-abstract-cooking-fire-free-logo-JmYWTjUsE-Q.jpg"/>
        </div>
        <ul>
            <li>
                <Link href='/'>Home</Link>
            </li>
            <li>
                <Link href='/'>Login/Signup</Link>
            </li>
            <li>
                <Link href='/'>Profile</Link>
            </li>
            <li>
                <Link href='/'>Home</Link>
            </li>
        </ul>

    </div>
  )
}

export default RestaurantHeader