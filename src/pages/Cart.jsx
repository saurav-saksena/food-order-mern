import React, { useContext, useEffect, useRef } from 'react'
import Foodcontext from '../FoodContext/Foodcontext'
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const navigate = useNavigate()
    const ref = useRef(null)
    const { cartDetails, foodCart, removeFromCart, checkoutOrder, removeallcarts } = useContext(Foodcontext)


    let totalQty = 0;
    for (let item of cartDetails) {
        totalQty = totalQty + parseInt(item.qty)
    }

    let totalBillPrice = 0;
    for (let item of cartDetails) {
        totalBillPrice = totalBillPrice + item.totalPrice
    }
    const placeOrder = () => {
        let item = {
            foodtype: cartDetails.length,
            totalqty: totalQty,
            totalbillprice: totalBillPrice,
            deliverycharge: 0,
            paymentmethod: "cod",
            foodproducts: cartDetails
        }
        checkoutOrder(item)
        for (let item of cartDetails) {
            removeallcarts(item._id)
        }

        ref.current.click()
        navigate("/confirmation")
    }

    useEffect(() => {
        if (localStorage.getItem("hungerFoodToken")) {
            foodCart();
        }
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <div>


                {cartDetails.length !== 0 && <h2 className="text-center text-light mt-3">Place order to enjoy delicious foods !</h2>
                }
                <div className='food--cart--container'>
                    {cartDetails.length !== 0 &&
                        <table className='foodcart--table' >

                            <thead>
                                <tr>
                                    <th>item</th>
                                    <th>food</th>
                                    <th>food name</th>
                                    <th>food category</th>
                                    <th>size</th>
                                    <th>qty</th>
                                    <th>price</th>
                                    <th>remove from cart</th>

                                </tr>

                            </thead>
                            <tbody>

                                {
                                    cartDetails.map((item, index) => {
                                        return (
                                            <tr key={item._id}>
                                                <td>{index + 1}</td>
                                                <td><img className='cart--img' src={item.img} alt='..' /></td>
                                                <td>{item.name}</td>
                                                <td>{item.CategoryName}</td>
                                                <td>{item.size}</td>
                                                <td>{item.qty}</td>
                                                <td>₹ {item.totalPrice}/-</td>
                                                {/* <td>{new Date(item.date).toDateString()}</td> */}
                                                <td><i
                                                    className="fa-solid fa-trash-can display--icon"
                                                    title='remove from cart'
                                                    onClick={() => removeFromCart(item._id)}
                                                >
                                                </i></td>

                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td colSpan="6">Total Bill Price </td>
                                    <td colSpan="2">₹ {totalBillPrice} /- </td>
                                </tr>

                            </tbody>

                        </table>
                    }
                    {cartDetails.length === 0 &&
                        <h2 className='text-light text-center'>No food in food cart !</h2>
                    }
                </div>
            </div>

            {/* <!-- Button trigger modal --> */}
            {cartDetails.length && <div className='d-flex justify-content-center m-3'>
                <button type="button" className="btn btn-primary text-center fw-bold" data-bs-toggle="modal" data-bs-target="#checkoutModal">
                    checkout
                </button>
            </div>}


            {/* <!-- Modal --> */}
            <div className="modal fade" id="checkoutModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">place order || enjoy food</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p className='fw-bold'>Number of food items : {cartDetails.length}</p>
                            <p className='fw-bold'>Total quantity of food items : {totalQty}</p>
                            <p className='fw-bold'>Payment method : cash on delivery</p>
                            <p className='fw-bold'>Delivery charge :₹ 0 /-</p>
                            <p className='fw-bold'>Total Bill Price : ₹ {totalBillPrice} /-</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={ref} className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={placeOrder}>place order !</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
