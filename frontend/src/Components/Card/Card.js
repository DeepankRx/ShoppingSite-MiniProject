import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
function Card(props) {
  const [quantity, setQuantity] = useState(1);
  const onDoubleClick = () => {
    window.location.reload();
  };
  return (
    <div className={styles.container} key={props.productId}>
      <div className={styles.card}>
        <img
          src={
            // require('../../'+props.imageUrl)
            require(`../../uploads/${props.imageUrl}`)
          }
          alt=""
        />
        <div className={styles.cardBody}>
          <div className={styles.row}>
            <div>
              <h4>{props.title}</h4>
              <h3>{props.price} Rs.</h3>
            </div>
            {!props.doNotDisplay && (
              <div className={styles.viewBtn}>
                <Link to={"/product/" + props.productId}>View Details</Link>
              </div>
            )}
            {/* create a counter for the quantity
             */}
            <div className={styles.counter}>
              <div className={styles.counterBtn}>
                <button
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => {
                    setQuantity(quantity + 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <hr />
          <h3
            style={{
              fontWeight: 300,
            }}
          >
            Category : {props.category}
          </h3>
          <p>
            {props.description.length > 50
              ? props.description.substring(0, 50) + "..."
              : props.description}
          </p>
          <div className={styles.btnGroup}>
            <div className={styles.btn}>
              {/* <a href="">Buy Now</a> */}
              {props.isLoggedIn && (
                <button
                  className={styles.button}
                  onClick={() => props.AddToCart(props.productId, quantity)}
                  onDoubleClick={onDoubleClick}
                >
                  <i className="fa fa-cart-plus" aria-hidden="true">
                    {" "}
                    Add To Cart
                  </i>
                </button>
              )}
              {!props.doNotDisplay && !props.isLoggedIn && (
                <Link to="/login" onDoubleClick={onDoubleClick}>
                  {" "}
                  <i className="fa fa-cart-plus" aria-hidden="true">
                    {" "}
                    Add To Cart
                  </i>
                </Link>
              )}
              {props.isAdmin ? (
                <>
                  <br />

                  <Link
                    style={{
                      marginTop: "20px",
                      marginBottom: "10px",
                      marginLeft: "0px",
                      marginRight: "10px",
                      backgroundColor: "purple",
                      color: "white",
                    }}
                    to={"/admin-product-update/" + props.productId}
                  >
                    Update
                  </Link>
                  <button
                    className={styles.button}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                    }}
                    onClick={() => props.deleteProduct(props.productId)}
                  >
                    Delete
                  </button>
                </>
              ) : null}
            </div>
            {/* for other buttons in white
              <a href=""> Cancel</a> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;
