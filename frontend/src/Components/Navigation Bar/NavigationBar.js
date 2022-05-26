import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
function NavigationBar() {
  const [clicked, setClicked] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const logOut = () => {
    axios
      .get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setIsLoggedIn(response.data.loggedIn);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
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
  }, [isLoggedIn]);
  return (
    <>
      <div className="container">
        <div>
          <div>
            <div>
              <Link to="/">Shopper's Stop</Link>
            </div>
            {isAdmin === true ? (
              <div>
                <Link to="/add-product">Add Product</Link>
              </div>
            ) : null}
            {isLoggedIn === true ? (
              <>
                <div>
                  <Link to="/cart">Cart</Link>
                </div>
                <div>
                  <button onClick={() => logOut()}>Logout</button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <button onClick={() => setClicked(clicked + 1)}>
                    <Link to="/login">Login</Link>
                  </button>
                </div>
                <div>
                  <button onClick={() => setClicked(clicked + 1)}>
                    <Link to="/signup">SignUp</Link>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NavigationBar;
