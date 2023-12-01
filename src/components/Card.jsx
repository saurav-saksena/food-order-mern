import React, { useState, useRef, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Foodcontext from '../FoodContext/Foodcontext'

export default function Card(props) {
    const [size, setSize] = useState("")
    const [qty, setQty] = useState(1)
    const pirceRef = useRef()
    const navigate = useNavigate()
    const { food } = props
    const { addToCart } = useContext(Foodcontext)
    let options = food.options[0]
    let priceOptions = Object.keys(options)
    let finalPrice = qty * parseInt(options[size])
    const addInCart = (foodid) => {
        if (localStorage.getItem("hungerFoodToken")) {

            addToCart(foodid, size, qty, finalPrice)
            setQty(1)
        } else {
            navigate("/login")
        }
    }
    useEffect(() => {
        setSize(pirceRef.current.value)
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className="card m-2 food--card" style={{ maxHeight: "480px" }}>
                <img src={food.img} className="card-img-top food--card--img" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{food.name}</h5>
                    <p className="card-text">{food.description}</p>
                    <div className='conatiner w-100 d-flex justify-content-between align-items-center'>
                        <select onChange={(e) => setQty(e.target.value)} value={qty} className='bg-success rounded w-25 text-center text-light'>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })

                            }
                        </select>
                        <select ref={pirceRef} onChange={e => setSize(e.target.value)} className='bg-success rounded w-25 text-center text-light'>
                            {priceOptions.map(data => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className='fs-5 fw-bold'>Price: ₹ {finalPrice}/-</div>
                    </div>
                    <hr />
                    <button onClick={() => addInCart(food._id)} className='btn btn-primary btn-sm w-100 text-center fw-bold'>add to cart</button>

                </div>
            </div>
        </>
    )
}
