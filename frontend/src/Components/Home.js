import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Home() {
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
                src={`https://source.unsplash.com/random/500x500?sig=${i + 1}`}
                className="image-fluid"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">{product.price}</p>
                { isLoggedIn === true ? (
                <button className="btn btn-primary">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to={`/add-to-cart/` + product._id}
                  >
                    Add to Cart
                  </Link>
                </button>) : (
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
                    <button className="bottom btn btn-primary">
                      <Link
                        style={{ color: "white", textDecoration: "none" }}
                        to={"/admin-product-delete/" + product._id}
                      >
                        Delete Product
                      </Link>
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
