import NavigationBar from "./Components/Navigation Bar/NavigationBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AddProduct from "./Components/AddProduct";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import SingleProduct from "./Components/SingleProduct";
import UpdateProduct from "./Components/UpdateProduct";
import PageNotFound from "./Components/PageNotFound";
import Cart from "./Components/Cart";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";

import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  console.log("App");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [location, setLocation] = useState("");
  useEffect(() => {
    setLocation(window.location.pathname);
    console.log(location);
    axios
      .get("http://localhost:5000/api/auth/isLoggedIn", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setIsLoggedIn(response.data.loggedIn);
        setIsAdmin(response.data.isAdmin);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(isLoggedIn);
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/add-product"
            element={
              isAdmin === false ? (
                <Navigate to="/login"></Navigate>
              ) : (
                <AddProduct />
              )
            }
          />
          <Route path="/product/:productId" element={<SingleProduct />} />
          <Route
            path="/admin-product-update/:productId"
            element={
              isAdmin === false ? (
                <Navigate to="/"></Navigate>
              ) : (
                <UpdateProduct />
              )
            }
          />

          <Route
            path="/cart"
            element={
              isLoggedIn === false ? (
                <Navigate to="/login"></Navigate>
              ) : (
                <Cart />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn === false ? <SignUp /> : <Navigate to="/"></Navigate>
            }
          />
          <Route
            path="/login"
            element={
              isLoggedIn === true ? <Navigate to="/"></Navigate> : <Login />
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
