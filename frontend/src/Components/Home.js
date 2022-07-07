import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../CSS/Card.module.css";
function Home() {
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const AddToCart = (productId) => {
    console.log(productId);
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
    <div className="Container">
      <div className="row">
        {products.map((product, i = 0) => (
          <div className="my-2 col-md-4" key={product._id}>
            <div className="card">
              <img
                src={`https://source.unsplash.com/random/350x200?sig=${i + 1}`}
                className="card-image"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-heading">{product.title}</h5>
                <p className="card-para">{product.description}</p>
                <p className="card-text">{product.price}</p>
                {isLoggedIn === true ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => AddToCart(product._id)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button className="btn btn-primary">
                    <Link
                      style={{ color: "white", textDecoration: "none" }}
                      to="/login"
                    >
                      Add to Cart
                    </Link>
                  </button>
                )}
                <button className="mx-4 btn btn-primary">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to={"/product/" + product._id}
                  >
                    Details
                  </Link>
                </button>
                {isAdmin === true ? (
                  <>
                    <button
                      className="bottom btn btn-primary"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete Product
                    </button>
                    <button className="center my-4 btn btn-primary">
                      <Link
                        style={{ color: "white", textDecoration: "none" }}
                        to={"/admin-product-update/" + product._id}
                      >
                        Update Product
                      </Link>
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
}
export default Home;
