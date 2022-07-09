import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
function Card(props) {
  return (
    <div className={styles.container} key={props.productId}>
      <div className={styles.card}>
        <img src={props.image} alt="" />
        <div className={styles.cardBody}>
          <div className={styles.row}>
            <div>
              <h4>{props.title}</h4>
              <h3>{props.price}</h3>
            </div>
            <div className={styles.viewBtn}>
              <Link to={"/product/" + props.productId}>View Details</Link>
            </div>
          </div>
          <hr />
          <p>
            {props.description.length > 50
              ? props.description.substring(0, 50) + "..."
              : props.description}
          </p>
          <div className={styles.btnGroup}>
            <div className={styles.btn}>
              {/* <a href="">Buy Now</a> */}
              {props.isLoggedIn ? (
                <Link to="" onClick={() => props.AddToCart(props.productId)}>
                  Add to Cart
                </Link>
              ) : (
                <Link to="/login">Add to Cart</Link>
              )}
              {props.isAdmin ? (
                <>
                  <Link to={"/admin-product-update/" + props.productId}>
                    Update
                  </Link>
                  <Link
                    to=""
                    onClick={() => props.deleteProduct(props.productId)}
                  >
                    Delete
                  </Link>
                </>
              ) : null}
            </div>
            { 
              /* for other buttons in white
              <a href=""> Cancel</a> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;
