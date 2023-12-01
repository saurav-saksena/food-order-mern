import React, { useEffect, useState, useContext } from 'react'
import Card from '../components/Card'
import Foodcontext from '../FoodContext/Foodcontext'
import carousal1 from "../carousal1.webp"
import carousal2 from "../carousal2.webp"
import carousal3 from "../carousal3.webp"



export default function Home() {
    const [search, setSearch] = useState("")
    const [foodData, setFoodData] = useState([])
    const [foodCat, setFoodCat] = useState([])
    const { foodCart } = useContext(Foodcontext)
    const getfoodData = async () => {
        const response = await fetch("http://localhost:4000/api/fetchfood", {
            method: "GET",
            "Content-Type": "application/json"
        })
        const result = await response.json()
        setFoodData(result.foodList)
        setFoodCat(result.foodCategory)

    }
    useEffect(() => {
        getfoodData()
        if (localStorage.getItem("hungerFoodToken")) {
            foodCart();
        }
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner" id="my--carousal" >
                    <div className="carousel-caption" style={{ zIndex: "2" }}>
                        <div className="d-flex fw-bold justify-content-center" role="search">
                            <input className="form-control me-2 fw-bold" type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" aria-label="Search" />
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src={carousal1} className="d-block w-100 carousal--img" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={carousal2} className="d-block w-100 carousal--img" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={carousal3} className="d-block w-100 carousal--img" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>


            <div className='container'>
                {
                    foodCat.length !== 0 ? foodCat.map(data => {
                        return (
                            <div key={data._id}>
                                <hr className='text-light' />
                                <h3 className='text-light text-center'>{data.CategoryName}</h3>
                                <hr className='text-light' />
                                <div className='row'>
                                    {foodData.length !== 0 ?
                                        foodData.filter(item => { return (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())) }).map(food => {
                                            return (
                                                <div key={food._id} className='col-md-6 col-lg-4'>
                                                    <Card food={food} />
                                                </div>
                                            )
                                        })
                                        :
                                        <h3>such product is not available right now !</h3>}
                                </div>
                            </div>
                        )

                    }) : <h1>loading...</h1>
                }

            </div>





        </>
    )
}
