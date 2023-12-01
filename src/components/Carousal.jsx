import React from 'react'

export default function Carousal() {
    return (
        <>
            <div id="carouselExampleFade" className="carousel slide carousel-fade">
                <div className="carousel-inner" id="my--carousal" >
                    <div className="carousel-caption" style={{ zIndex: "2" }}>
                        <div className="d-flex fw-bold justify-content-center" role="search">
                            <input className="form-control me-2 fw-bold" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-light fw-bold" type="button">Search</button>
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://content3.jdmagicbox.com/comp/def_content/fast-food/22-fast-food-9-20wsq.jpg" className="d-block w-100 carousal--img" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://img.veenaworld.com/wp-content/uploads/2022/10/Famous-Foods-of-Mysore-%E2%80%93-Dishes-You-Should-Try-on-Your-Next-Vacation.jpg" className="d-block w-100 carousal--img" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://img.veenaworld.com/wp-content/uploads/2023/01/13-Traditional-Food-Items-of-Assam-You-Need-to-Try-on-Your-Next-Vacation.jpg" className="d-block w-100 carousal--img" alt="..." />
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

        </>
    )
}
