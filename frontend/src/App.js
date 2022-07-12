import NavigationBar from "./Components/Navigation Bar/NavigationBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AddProduct from "./Components/AddProduct";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import SingleProduct from "./Components/SingleProduct/SingleProduct";
import UpdateProduct from "./Components/UpdateProduct";
import PageNotFound from "./Components/404/PageNotFound";
import Cart from "./Components/Cart";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import agent from "./agent";
import { useEffect, useState, useContext } from "react";
import SessionState from "./Context/SessionDetails/SessionState";
import OrderHistory from "./Components/OrderHistory";
function App() {
  const a = useContext(SessionState);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    agent.Auth.isLoggedIn().then((response) => {
      setIsLoggedIn(response.data.loggedIn);
      setIsAdmin(response.data.isAdmin);
      a.setIsAdmin(response.data.isAdmin);
      a.setIsLoggedIn(response.data.loggedIn);
    });
  }, []);

  return (
    <>
      <Router>
        <SessionState>
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
                  isLoggedIn === false ? (
                    <SignUp />
                  ) : (
                    <Navigate to="/"></Navigate>
                  )
                }
              />
              <Route
                path="/login"
                element={
                  isLoggedIn === true ? <Navigate to="/"></Navigate> : <Login />
                }
              />
              <Route path="/orderHistory" element={<OrderHistory />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
          </div>
        </SessionState>
      </Router>
    </>
  );
}

export default App;
