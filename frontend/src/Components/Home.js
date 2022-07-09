import axios from "axios";
import { useState, useEffect } from "react";
import agent from "../agent";
import Card from "../Components/Card/Card";
import styles from '../CSS/Card.module.css';
function Home() {
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const AddToCart = (productId) => {
    axios
      .post(
        `http://localhost:5000/api/shop/cart/`,
        {
          productId: productId,
          quantity: 1,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        alert("Product Added Successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteProduct = (productId) => {
    console.log(productId);
    axios
      .delete(`http://localhost:5000/api/admin/delete-product/${productId}`, {
        withCredentials: true,
      })
      .then((res) => {
        alert("Product Deleted Successfully!");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    agent.Auth.isLoggedIn().then((response) => {
      setIsLoggedIn(response.data.loggedIn);
      setIsAdmin(response.data.isAdmin);
    });
  }, [isLoggedIn]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/shop/all-products", {
        //have to put withCredentials:true to get cookies from client
        //have to put it in every axios request
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.Container}>
      <div className="row">
        {products.map((product, i = 0) => (
          <Card
            title={product.title}
            price={product.price}
            image={`https://source.unsplash.com/random/350x200?sig=${i + 1}`}
            description={product.description}
            productId={product._id}
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            AddToCart={AddToCart}
            deleteProduct={deleteProduct}
            key={product._id}
          />
          

        ))}
      </div>
    </div>
  );
}
export default Home;
