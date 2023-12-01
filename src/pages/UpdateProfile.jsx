import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function UpdateProfile() {
    const [data, setData] = useState({ id: "", name: "", location: "", phone: "", city: "", pincode: "", pic: "" })
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("hungerFoodToken")) {
            getuserdetails();
        }

        // eslint-disable-next-line
    }, []);
    const fillform = (userDetails) => {
        setData({
            id: userDetails._id,
            name: userDetails.name,
            phone: userDetails.phone,
            city: userDetails.city,
            location: userDetails.location,
            pincode: userDetails.pincode
        })

    }
    const getuserdetails = async () => {
        const response = await fetch("http://localhost:4000/api/userdetails",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("hungerFoodToken"),
                },
            }
        );
        const data = await response.json();

        if (data.success) {
            fillform(data.user)
        } else {
            console.log(data.msg);
        }
    };
    const postUpdatedData = async () => {
        let item = new FormData()
        item.append("name", data.name)
        item.append("phone", data.phone)
        item.append("location", data.location)
        item.append("pincode", data.pincode)
        item.append("city", data.city)
        item.append("pic", data.pic)

        const response = await fetch("http://localhost:4000/api/updateprofile/" + data.id, {
            method: "PUT",
            headers: {
                Authorization: localStorage.getItem("hungerFoodToken")
            },
            body: item
        })
        const result = await response.json()
        if (result.success) {
            navigate("/profile")
        } else (
            console.log(result.msg)
        )

    }
    const handleChange = (e) => {

        const { name, value } = e.target
        setData((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })

    }
    const handleFile = (e) => {
        const { name, files } = e.target
        setData((pre) => {
            return {
                ...pre,
                [name]: files[0]
            }
        })

    }

    const submitData = () => {
        postUpdatedData()
    }
    return (
        <div className='container  update--profile--container'>
            <h2>Update Profile</h2>
            <form onSubmit={(e) => { e.preventDefault() }}>
                <div className="mb-3">
                    <label htmlFor="update-name" className="form-label">Name</label>
                    <input type="text" name='name' className="form-control" id="update-name" placeholder="name" onChange={handleChange} value={data.name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="update-phone" className="form-label" >Phone</label>
                    <input type="number" name='phone' className="form-control" id="update-phone" placeholder="phone" onChange={handleChange} value={data.phone} />
                </div>
                <div className="mb-3">
                    <label htmlFor="update-city" className="form-label">City</label>
                    <input type="text" name="city" className="form-control" id="update-city" placeholder="city" onChange={handleChange} value={data.city} />
                </div>
                <div className="mb-3">
                    <label htmlFor="update-location" className="form-label">location/address</label>
                    <input type="text" name='location' className="form-control" id="update-location" placeholder="location/address" onChange={handleChange} value={data.location} />
                </div>

                <div className="mb-3">
                    <label htmlFor="update-pincode" className="form-label">pin code</label>
                    <input type="text" name='pincode' className="form-control" id="update-pincode" placeholder="pincode" onChange={handleChange} value={data.pincode} />
                </div>



                <div className="mb-3">
                    <label htmlFor="update-pic" className="form-label">Update a profile picture</label>
                    <input className="form-control" type="file" name='pic' onChange={handleFile} id="update-pic" />
                </div>
                <div className='mb-3'>
                    <button type='button' className='btn btn-primary w-100' onClick={submitData}>update</button>

                </div>
            </form>
        </div>
    )
}
