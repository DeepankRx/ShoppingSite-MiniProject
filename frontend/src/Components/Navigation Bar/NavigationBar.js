import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Navigation.module.css";
import classnames from "classnames";
import Slider from "../Util/Slider";
import Login from "../Login"
function NavigationBar() {
  console.log(Login)
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
        setIsLoggedIn(false);
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
      {/* <div classNameName={styles.container}>
        <div>
          <div>
            <div>
              <Link className={styles.a} to="/">Shopper's Stop</Link>
            </div>
            {isAdmin === true ? (
              <div>
                <Link className={styles.a} to="/add-product">Add Product</Link>
              </div>
            ) : null}
            {isLoggedIn === true ? (
              <>
                <div>
                  <Link className={styles.a} to="/cart">Cart</Link>
                </div>
                <div>
                  <button className="button"  onClick={() => logOut()}>Logout</button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <button className="button"  onClick={() => setClicked(clicked + 1)}>
                    <Link className={styles.a} to="/login">Login</Link>
                  </button>
                </div>
                <div>
                  <button className="button"  onClick={() => setClicked(clicked + 1)}>
                    <Link className={styles.a} to="/signup">SignUp</Link>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div> */}
      {/* <header className={styles.header}>
        <img
          className={styles.logo}
          src="https://source.unsplash.com/random/250x50?sig=100"
          alt="logo"
        />
        <nav>
          <ul className={styles.nav__links}>
            <li className={styles.li}>
              <Link className={styles.a} to="/">
                Home
              </Link>
            </li>
            {isAdmin === true ? (
              <li className={styles.li}>
                <Link className={styles.a} to="/add-product">
                  Add Product
                </Link>
              </li>
            ) : null}

            {isLoggedIn === true ? (
              <li className={styles.li}>
                <Link className={styles.a} to="/cart">
                <i class="fa fa-shopping-cart"
                style={{
                  fontSize: "2rem", 
                }}
                 aria-hidden="true"></i>
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
        {isLoggedIn === true ? (
          <button className={styles.button}
          style={{
            backgroundColor: '#F24C4C',
            color: 'white',
          }}
           onClick={() => logOut()}>
            Logout
          </button>
        ) : (
          <>
            <Link className={styles.a} to="/login">
              <button className={styles.button}>Log In</button>
            </Link>
            <Link className={styles.a} to="/signup">
              <button className={classnames(styles.signup_button,styles.button)} >Sign Up</button>
            </Link>
          </>
        )}
      </header>
      <Slider/> */}
      <div className={styles.wrapper}>
        <nav>
          <Link to="/" className={styles.logo}>
            Thrift Shop
          </Link>
          {/* add a search bar
           */}
          
          <ul>
          {isAdmin === true ? (
              <li className={styles.li}>
                <Link className={styles.a} to="/add-product">
                  Add Product
                </Link>
              </li>
            ) : null}
           
            {isLoggedIn === true ? (
              <li className={styles.li}>
                <Link className={styles.a} to="/cart">
                <i className="fa fa-shopping-cart"
                style={{
                  fontSize: "2rem", 
                }}
                 aria-hidden="true"></i>
                </Link>
              </li>
            ) : null}
            <li>
            </li>
          </ul>
            {isLoggedIn === true ? (
              <li className={styles.li}>
                <Link className={styles.a} to="/">
                <i className="fa fa-sign-out"
                style={{
                  fontSize: "2rem", 
                }}
                 aria-hidden="true"
                 title="Logout"
                 onClick={()=>logOut()}></i>
                </Link>
              </li>
            ) : (
          <>
            <Link className={styles.a} to="/login">
              <button className={styles.button}>Login</button>
            </Link>
            <Link className={styles.a} to="/signup">
              <button className={classnames(styles.signup_button,styles.button)} >Sign Up</button>
            </Link>
          </>
        )}
        </nav>
      </div>
      <Slider/>
    </>
  );
}

export default NavigationBar;
