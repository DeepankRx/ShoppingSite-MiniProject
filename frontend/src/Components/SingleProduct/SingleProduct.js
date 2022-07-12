import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../Card/Card";
import styles from "./SingleProduct.module.css";
function SingleProduct() {
  const [product, setProduct] = useState([]);
  const [sameCategoryProducts, setSameCategoryProducts] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const params = useParams();
  const productId = params.productId;
  console.log(params.productId);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/shop/${params.productId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setProduct(res.data);
        setImageUrl(res.data.imageUrl);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:5000/api/shop/category/${params.productId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setSameCategoryProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [imageUrl]);
  console.log(product);
  if (product.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <h1
          style={{
            textAlign: "center",
            fontSize: "50px",
            fontWeight: "200",
            color: "black",
            fontFamily:"cursive",
            textDecoration:"underline"
          }}
        >
          Product Details
        </h1>
        <div className={styles.container}>
          <div className={styles.productDetails}>
            <h1>{product.title}</h1>

            <p className={styles.information}>
              {product.description <= 230
                ? product.description
                : product.description.substring(0, 230) + "..."}
            </p>
            <p className={styles.information}>Price :{product.price}</p>
          </div>

          <div className={styles.productImage}>
            <img
              src={require(`../../uploads/${product.imageUrl}`)}
              alt="product"
            />

            <div className={styles.info}>
              <h2>The Description</h2>
              <ul>
                <li>
                  <strong>Buy Now: </strong>
                  <button className={styles.btn}>Add to Cart</button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h1
          style={{
            textAlign: "center",
            fontSize: "50px",
            fontWeight: "200",
            color: "black",
            fontFamily:"cursive",
            textDecoration:"underline"
          }}
        >
          Similar Products
        </h1>
        <div className="container">
          <div className="row">
            {sameCategoryProducts.map((product) => (
              <Card
                title={product.title}
                doNotDisplay={true}
                price={product.price}
                imageUrl={product.imageUrl}
                description={product.description}
                productId={product._id}
                category={product.category}
                // isLoggedIn={isLoggedIn}
                // isAdmin={isAdmin}
                // AddToCart={AddToCart}
                // deleteProduct={deleteProduct}
                key={product._id}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}
export default SingleProduct;
