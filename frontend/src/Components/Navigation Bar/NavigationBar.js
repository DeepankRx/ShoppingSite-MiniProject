import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import SessionContext from "../../Context/SessionDetails/SessionContext";
import axios from "axios";
import styles from "./Navigation.module.css";
import classnames from "classnames";
import Slider from "../Util/Slider";
import Login from "../Login";
function NavigationBar() {
  const a = useContext(SessionContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const onDoubleClick = () => {
    window.location.reload();
  }
  useEffect(() => {
    setIsLoggedIn(a.isLoggedIn);
    setIsAdmin(a.isAdmin);
  }, [a]);
  const logOut = () => {
    axios
      .get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      })
      .then((response) => {
        a.setIsAdmin(false);
        a.setIsLoggedIn(false);
        setIsLoggedIn(false);
        console.log(response.data, a);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
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
                <Link className={styles.a} 
                onDoubleClick={onDoubleClick}
                to="/cart">
                  <i
                    className="fa fa-shopping-cart"
                    style={{
                      fontSize: "2rem",
                    }}
                    aria-hidden="true"
                  ></i>
                </Link>
              </li>
            ) : null}
            <li></li>
          </ul>
          {isLoggedIn === true ? (
            <li className={styles.li}>
              <Link className={styles.a} to="/">
                <i
                  className="fa fa-sign-out"
                  style={{
                    fontSize: "2rem",
                  }}
                  aria-hidden="true"
                  title="Logout"
                  onClick={() => logOut()
                  }
                  onDoubleClick={onDoubleClick}
                ></i>
              </Link>
            </li>
          ) : (
            <>
              <Link className={styles.a} 
              onDoubleClick={onDoubleClick}
              to="/login">
                <button className={styles.button}>Login</button>
              </Link>
              <Link 
              onDoubleClick={onDoubleClick}
              className={styles.a} to="/signup">
                <button
                  className={classnames(styles.signup_button, styles.button)}
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </nav>
      </div>
      <Slider />
    </>
  );
}

export default NavigationBar;
