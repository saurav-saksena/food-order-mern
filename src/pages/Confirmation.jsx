import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Foodcontext from '../FoodContext/Foodcontext'

export default function Confirmation() {
    const { foodCart } = useContext(Foodcontext)
    useEffect(() => {
        foodCart()
        // eslint-disable-next-line
    }, [])
    return (
        <div className='container my-5 text-center bg-light p-3 rounded'>
            <h3 className='text-success'>Thank You!!!</h3>
            <h4>Your Order Has Been Placed!!!</h4>
            <p className='fw-bold'>Now You Can Track Your Order in <Link to="/myorder">My Order</Link>  Section or go to <Link to="/">Home</Link></p>
        </div>
    )
}