import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
function AddToCart() {
  const params = useParams();
  console.log(params);
  useEffect(() => {
    console.log("Inside useEffect");
    axios
      .post(
        `http://localhost:5000/api/shop/cart/`,
        {
          productId: params.productId,
          quantity: 1,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <Navigate to="/cart"></Navigate>;
}
export default AddToCart;
