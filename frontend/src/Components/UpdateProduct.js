import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
function UpdateProduct() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const params = useParams();
  console.log(params.productId);
  const handleSubmit = (e) => {
    const product = {};
    e.preventDefault();
    if (title.length > 0) {
      product.title = title;
    }
    if (imageUrl.length > 0) {
      product.imageUrl = imageUrl;
    }
    if (price.length > 0) {
      product.price = price;
    }
    if (description.length > 0) {
      product.description = description;
    }

    axios
      .put(
        `http://localhost:5000/api/admin/update-product/${params.productId}`,
        product
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setImageUrl("");
    setTitle("");
    setPrice("");
    setDescription("");
  };

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const imageUrlHandler = (e) => {
    setImageUrl(e.target.value);
  };
  const priceHandler = (e) => {
    setPrice(e.target.value);
  };
  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Update Product</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={titleHandler}
                  />
                </div>
                <div className="form-group">
                  <label>Product Description</label>
                  <textarea
                    className="form-control"
                    onChange={descriptionHandler}
                    value={description}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Product Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={priceHandler}
                  />
                </div>
                <div className="form-group">
                  <label>Product Image</label>
                  <input
                    type="text"
                    className="form-control"
                    value={imageUrl}
                    onChange={imageUrlHandler}
                  />
                </div>
                <button className="btn btn-success">Update Product</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpdateProduct;
