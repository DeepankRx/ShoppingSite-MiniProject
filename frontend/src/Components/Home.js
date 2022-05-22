import axios from "axios";
import { useState, useEffect } from "react";
import { Link,useParams } from "react-router-dom";
function Home() {
  const [products, setProducts] = useState([]);
  const params = useParams();
  console.log(params.productId)
  useEffect(() => {
    if(params.productId)
    {
      axios.get(`http://localhost:5000/api/shop/${params.productId}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else{
    axios
      .get("http://localhost:5000/api/shop/all-products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, []);
 
   if(params.productId)
    {
        return (
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <img src={"https://source.unsplash.com/random/2000x2000?sig=1"} className="card-img-bottom" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{products.title}</h5>
                    <p className="card-text">{products.description}</p>
                    <p className="card-text">
                      <small className="text-muted">Price: {products.price}</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

            
        );
    }
        else{
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
                <button className="mx-4 btn btn-primary"><Link to={'/product/'+product._id}>Details</Link></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
        }
}
export default Home;
