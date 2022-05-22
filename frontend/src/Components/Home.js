import axios from "axios";
import { useState, useEffect } from "react";
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
  console.log(products);
  return (
    <div className="Container">
      <div className="row">
        {products.map((product, i = 0) => (
          <div className="col-md-4">
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
                <button className="mx-4 btn btn-primary">Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
