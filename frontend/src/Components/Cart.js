import axios from "axios";
import { useState, useEffect } from "react";
function Cart() {
  const [cartItem, setCartItem] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchCart() {
      await axios
        .get("http://localhost:5000/api/shop/getCart")
        .then((res) => {
          setCartItem(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchCart();

    async function fetchProducts() {
      await axios
        .get(`http://localhost:5000/api/shop/${cartItem.products[0].productId}`)
        .then((res) => {
          setProducts(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (cartItem.products) {
      fetchProducts();
    }
  }, []);
  console.log(products);
  if (cartItem.products) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Cart</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Serial Number</th>
                  <th>Product</th>

                  <th>Quantity</th>

                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItem.products.map((item,i=0) => (
                  <tr key={item._id}>
                  <td>{i+1}</td>
                    <td>{item.productId}</td>
                    <td>{!isNaN(item.quantity) ? item.quantity : 0}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          axios
                            .delete(
                              `http://localhost:5000/api/shop/cart/${item._id}`
                            )
                            .then((response) => {
                              console.log(response.data);
                              setCartItem(response.data);
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Cart is Empty</h1>
      </div>
    );
  }
}
export default Cart;
