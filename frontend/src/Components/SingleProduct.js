import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
function SingleProduct() {
  const [product, setProduct] = useState([]);
  const [sameCategoryProducts, setSameCategoryProducts] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const params = useParams();
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
  if(product.length === 0){
    return <div>Loading...</div>
  }
  else
  {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <img
                src={
                 
                  require(`../uploads/${product.imageUrl}`)
                 
                  // "../uploads/"+product.imageUrl
                }
                className="card-img-bottom"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">{product.category}</p>
                <p className="card-text">
                  <small className="text-muted">Price: {product.price}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      Similar Products
      <div className="container">
        <div className="row">
          {sameCategoryProducts.map((item) => (
            console.log("item",item.imageUrl),
            <div className="col-md-3" key={item._id}>
              <div className="card">
                <img
                  src={
                    // item.imageUrl > 0 ?
                  require(`../uploads/${item.imageUrl}`)
                  // : require("../uploads/cover1.jpg")
                  }
                  className="card-img-bottom"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">{item.category}</p>
                  <p className="card-text">
                    <small className="text-muted">Price: {item.price}</small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
                }
}
export default SingleProduct;
