import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Foodcontext from '../FoodContext/Foodcontext'



export default function Nav() {
    const navigate = useNavigate()
    const location = useLocation()
    const { cartDetails, foodCart } = useContext(Foodcontext)
    const handleLogout = () => {
        localStorage.removeItem("hungerFoodToken")
        navigate("/login")
    }
    useEffect(() => {
        if (localStorage.getItem("hungerFoodToken")) {
            foodCart();
        }
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary " data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold" to="/">Food_Hunger</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link  fw-bold ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>

                            {localStorage.getItem("hungerFoodToken") &&
                                <li className="nav-item">
                                    <Link className={`nav-link fw-bold ${location.pathname === "/myorder" ? "active" : ""}`} to="/myorder">My Orders</Link>
                                </li>

                            }
                            <li className="nav-item">
                                <Link className={`nav-link fw-bold ${location.pathname === "/profile" ? "active" : ""}`} to="/profile">Profile</Link>
                            </li>


                        </ul>
                        {!localStorage.getItem("hungerFoodToken") ?
                            <div className='d-flex'>
                                <Link className={`btn mx-1 fw-bold ${location.pathname === "/signup" ? "btn-light" : "btn-outline-light"}`} to="/signup">Signup</Link>
                                <Link className={`btn fw-bold ${location.pathname === "/login" ? "btn-light" : "btn-outline-light"}`} to="/login">Login</Link>
                            </div> :
                            <div className='d-flex'>
                                <Link to="/cart" className={`btn fw-bold ${location.pathname === "/cart" ? "btn-light" : "btn-outline-light"}`}>
                                    Cart <span className="badge text-bg-danger">{cartDetails.length}</span>
                                </Link>
                                <button className="btn btn-outline-danger fw-bold mx-1" onClick={handleLogout}>Log Out</button>
                            </div>
                        }

                    </div>
                </div>
            </nav>
        </>
    )
}
