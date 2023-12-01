import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Store from "./FoodContext/Store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Confirmation from "./pages/Confirmation";
import Myorder from "./pages/Myorder";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  return (
    <>
      <Store>
        <BrowserRouter>
          <ToastContainer />
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />
            <Route path="/myorder" element={<Myorder />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </BrowserRouter>
      </Store>
    </>
  );
}

export default App;
