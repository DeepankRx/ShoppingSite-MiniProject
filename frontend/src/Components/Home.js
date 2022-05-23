import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/shop/all-products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("Tests");

  return (
    <div className="Container">
      <div className="row">
        {products.map((product, i = 0) => (
          <div className="mx-2 my-2 col-md-4" key={product._id}>
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
                <button className="btn btn-primary">Add to Cart</button>
                <button className="mx-4 btn btn-primary">
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to={"/product/" + product._id}
                  >
                    Details
                  </Link>
                </button>
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
