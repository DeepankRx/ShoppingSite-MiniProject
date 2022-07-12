import axios from "axios";
import { useState, useEffect, useContext } from "react";
import SessionContext from "../Context/SessionDetails/SessionContext";
import Card from "../Components/Card/Card";
function Home() {
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const a = useContext(SessionContext);
  console.log(a);
  useEffect(() => {
    setIsLoggedIn(a.isLoggedIn);
    setIsAdmin(a.isAdmin);
  }, [a]);

  const AddToCart = (productId, quantity) => {
    axios
      .post(
        `http://localhost:5000/api/shop/cart/`,
        {
          productId: productId,
          quantity: quantity,
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
    axios
      .get("http://localhost:5000/api/shop/all-products", {
        //have to put withCredentials:true to get cookies from client
        //have to put it in every axios request
        withCredentials: true,
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "50px",
          fontSize: "50px",
          textDecoration: "underline",
        }}
      >
        Welcome to the{" "}
        <span
          style={{
            color: "red",
            fontSize: "50px",
            fontWeight: "bold",
          }}
        >
          <strong>
            <i>Thrift Shop</i>
          </strong>
        </span>
      </h1>
      {products.map(
        (product, i = 0) => (
          console.log(product.imageUrl),
          (
            <Card
              title={product.title}
              price={product.price}
              imageUrl={product.imageUrl}
              description={product.description}
              productId={product._id}
              isLoggedIn={isLoggedIn}
              isAdmin={isAdmin}
              AddToCart={AddToCart}
              deleteProduct={deleteProduct}
              category={product.category}
              key={product._id}
            />
          )
        )
      )}
    </>
  );
}
export default Home;
