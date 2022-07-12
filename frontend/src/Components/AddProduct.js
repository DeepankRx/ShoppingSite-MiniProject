import { useState } from "react";
import axios from "axios";
function AddProduct() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState({ preview: "", data: "" });
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const backendUrl = "http://localhost:5000/api/admin/add-product";
  const handleSubmit = (e) => {
    e.preventDefault();
    //if image is uploaded
    if (image.data) {
      axios
        .post(
          backendUrl,
          {
            title: title,
            image: image.data,
            price: price,
            description: description,
            category: category,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      setImage({ preview: "", data: "" });
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
    } else {
      alert("Image already uploaded");
    }
  };
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const imageHandler = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    console.log(img);
    setImage(img);
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
              <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                  <label>Product image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={imageHandler}
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
