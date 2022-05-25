import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
function NavigationBar() {
  const [clicked, setClicked] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/isLoggedIn", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setIsLoggedIn(response.data.loggedIn);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <div>
              <Link className="mx-3 link-light" to="/">
                Shopper's Stop
              </Link>
            </div>
            {isAdmin === true ? (
              <div>
                  <Link className="link-light" to="/add-product">
                    Add Product
                  </Link>
                </div>
                ) : null}
            {isLoggedIn === true ? (
              <>
                
                <div>
                  <Link className="mx-3 link-light" to="/cart">
                    Cart
                  </Link>
                </div>
                <div>
                <button className="btn btn-danger" onClick={() => setClicked(clicked+1)}>
                  <Link className="mx-3 link-light" to="/logout">
                    Logout
                  </Link>
                </button>
                </div>
              </>
            ) : (
              <>
                <div>
                <button className="mx-3 btn btn-success" onClick={() => setClicked(clicked +1)}>
                  <Link className="mx-3 link-light" to="/login">
                    Login
                  </Link>
                </button>
                </div>
                <div>
                <button className="btn btn-secondary" onClick={() => setClicked(clicked+1)}>
                  <Link className="mx-3 link-light" to="/signup">
                    SignUp
                  </Link>
                </button>
                </div>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
