import React, { useEffect, useState } from 'react'

export default function Myorder() {
    const [oreders, setOrders] = useState([])
    const getCheckoutData = async () => {
        const response = await fetch("http://localhost:4000/api/checkoutdata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("hungerFoodToken")
            }
        })
        const result = await response.json()
        if (result.success) {
            setOrders(result.data)
        } else {
            console.log(result.msg)
        }
    }
    useEffect(() => {
        getCheckoutData()
        // eslint-disable-next-line
    }, [])
    return (
        <>
            {oreders.length === 0 && <h1 className="conatiner text-center mt-3 text-light">No order record found !</h1>}
            <div className='my--order--section--conatiner'>
                {oreders.length !== 0 && oreders.map((item, ind) => {
                    return (
                        <div className='bg-light  mt-3 rounded my--order--section ' key={item._id}>
                            <p>{item.useremail}</p>
                            <p><span className="badge text-bg-dark">{ind + 1}</span></p>

                            <p>Checkout time : {new Date(item.date).toDateString()} At {new Date(item.date).getHours() + " : " + new Date(item.date).getMinutes()}{new Date(item.date).getHours() >= 12 ? " PM " : " AM "}</p>


                            <p>Number of food types : {item.foodtype}</p>
                            <p>Total quantity of food items : {item.totalqty}</p>
                            <p>Delivery charge : {item.deliverycharge}</p>
                            <p>Payment method : {item.paymentmethod}</p>
                            <p>Total bill price : ₹ {item.totalbillprice} /-</p>
                            <hr />
                            <div className='my--order--item--conatiner'>
                                {item.foodproducts.map((data, index) => {
                                    return (
                                        <div key={index} className='checkout--all--item'>


                                            <img className="my--order--img" src={data.img} alt='...' />
                                            <p>{data.name}</p>
                                            <p>Category: {data.CategoryName}</p>
                                            <p>Quantity: {data.qty}</p>
                                            <p>Total Price: ₹ {data.totalPrice} /-</p>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    )
                })}
            </div>
        </>
    )
}
