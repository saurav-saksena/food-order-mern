import React, { useContext, useEffect } from 'react'
import Foodcontext from '../FoodContext/Foodcontext'
import { Link, useNavigate } from 'react-router-dom'
export default function Profile() {
    const { userdata, fetchUserDetails } = useContext(Foodcontext)
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("hungerFoodToken")) {

            fetchUserDetails()
        } else {
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("hungerFoodToken")
        navigate("/login")
    }

    return (
        <>
            <div className='container profile--page'>
                <div className='profile--img--container'>
                    {userdata.pic ? <img src={"http://localhost:4000/public/uploads/user/" + userdata.pic} alt='profile-img' /> : <img src='https://imgclothing.com.co/cdn/shop/files/Logo_IMG_invertido-02_2551x.png?v=1668785641' alt='' />}
                </div>
                <div className='profile--detail--container'>
                    <p>Name : {userdata.name}</p>
                    <p>Email : {userdata.email}</p>
                    <p>Phone : {userdata.phone} </p>
                    <p>City : {userdata.city} </p>
                    <p>Address/Location : {userdata.location}</p>
                    <p>Pin Code: {userdata.pincode} </p>
                    <p>Account created : {new Date(userdata.date).toDateString() + " at " + new Date(userdata.date).getHours() + " : "}{(new Date(userdata.date).getMinutes() < 10 ? "0" : "") + new Date(userdata.date).getMinutes()} {new Date(userdata.date).getHours() >= 12 ? " PM " : " AM "}</p>
                    <Link to="/updateprofile">update profile</Link>
                    <button type='button' className='log--out--button' onClick={handleLogout} >log out</button>
                </div>
            </div>
        </>
    )
}
