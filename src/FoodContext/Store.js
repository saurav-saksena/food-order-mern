import React, { useEffect, useState } from "react";
import Foodcontext from "./Foodcontext";
import { toast } from "react-toastify";

export default function Store(props) {
  const [cartDetails, setCartDetails] = useState([]);
  const [userdata, setUserdata] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("hungerFoodToken")) {
      foodCart();
      fetchUserDetails();
    }
  }, []);

  //success msg alert
  const successAlert = (success) => {
    toast.success(success, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      className: "toast--message",
    });
  };

  //error alert
  const errorAlert = (error) => {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      className: "toast--message",
    });
  };

  //logged in user details
  const fetchUserDetails = async () => {
    const response = await fetch("http://localhost:4000/api/userdetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("hungerFoodToken"),
      },
    });
    const result = await response.json();
    if (result.success) {
      setUserdata(result.user);
    } else {
      console.log(result.msg);
    }
  };

  // get food cart details for user
  const foodCart = async () => {
    const response = await fetch("http://localhost:4000/api/foodcart/get", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("hungerFoodToken"),
      },
    });
    const result = await response.json();
    if (result.success) {
      setCartDetails(result.data);
    } else {
      console.log(result.msg);
    }
  };

  //add to cart
  const addToCart = async (foodid, size, qty, totalPrice) => {
    const response = await fetch("http://localhost:4000/api/foodcart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("hungerFoodToken"),
      },
      body: JSON.stringify({ foodid, size, qty, totalPrice }),
    });
    const result = await response.json();
    if (result.success) {
      const msgg = "food added in cart !";
      foodCart();
      successAlert(msgg);
    } else {
      errorAlert(result.msg);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/foodcart/delete/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("hungerFoodToken"),
          },
        }
      );
      let result = await response.json();
      if (result.success) {
        const msgg = "food item removed from cart !";
        const newNotes = cartDetails.filter((note) => {
          return note._id !== id;
        });
        setCartDetails(newNotes);
        successAlert(msgg);
      } else {
        errorAlert(result.msg);
      }
    } catch (error) {
      const data = "server error!";
      errorAlert(data);
    }
  };
  //checkout routes
  const checkoutOrder = async (item) => {
    const response = await fetch("http://localhost:4000/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("hungerFoodToken"),
      },
      body: JSON.stringify(item),
    });
    const result = await response.json();
    if (result.success) {
      let msgg = "order placed successfully";
      successAlert(msgg);
    } else {
      errorAlert(result.msg);
    }
  };

  const removeallcarts = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/foodcart/delete/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("hungerFoodToken"),
          },
        }
      );
      let result = await response.json();
      if (!result.success) {
        errorAlert(result.msg);
      }
    } catch (error) {
      const data = "server error!";
      errorAlert(data);
    }
  };
  return (
    <Foodcontext.Provider
      value={{
        cartDetails,
        foodCart,
        addToCart,
        removeFromCart,
        checkoutOrder,
        removeallcarts,
        fetchUserDetails,
        userdata,
      }}
    >
      {props.children}
    </Foodcontext.Provider>
  );
}
