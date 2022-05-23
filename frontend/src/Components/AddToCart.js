import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function AddToCart() {
  console.log("Hi")
  const params = useParams();
  useEffect(() => {
    console.log("Inside useEffect")
    axios
      .post(`http://localhost:5000/api/shop/cart/`, {
        productId: params.productId,
        quantity: 1,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h1>Added to cart</h1>
    </div>
  );
}
export default AddToCart;