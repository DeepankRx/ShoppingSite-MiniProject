import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import axios from "axios";
function AddProduct() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const backendUrl = "http://localhost:5000/api/admin/add-product";
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        backendUrl,
        {
          title: title,
          imageUrl: imageUrl,
          price: price,
          description: description,
          category: category,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setImageUrl("");
    setTitle("");
    setPrice("");
    setDescription("");
    setCategory("");
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
              <h3>Add Product</h3>
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
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Product Description</label>
                  <textarea
                    className="form-control"
                    onChange={descriptionHandler}
                    value={description}
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Product Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={priceHandler}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Product Image</label>
                  <input
                    type="text"
                    className="form-control"
                    value={imageUrl}
                    onChange={imageUrlHandler}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Product Category</label>
                  <select
                    className="form-control"
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Shirts">Shirts</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Jackets">Jackets</option>
                    <option value="Sweaters">Sweaters</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Watches">Watches</option>
                    <option value="Bags">Bags</option>
                    <option value="Caps">Caps</option>
                  </select>
                </div>
                <button className="btn btn-success">Add Product</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddProduct;
