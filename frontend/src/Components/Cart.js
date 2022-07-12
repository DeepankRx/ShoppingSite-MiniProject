import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
function Cart() {
  const [cartItem, setCartItem] = useState([]);
  const [products, setProducts] = useState([]);
  const [click, setClick] = useState(1);

  const checkOut = () => {
    axios
      .post(
        "http://localhost:5000/api/shop/placeOrder",
        {
          products: cartItem.products,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        alert("Order Placed Successfully");
        window.location.reload();
      })
      .catch((err) => console.log(err.response.data));
  };
  useEffect(() => {
    function fetchCart() {
      axios
        .get("http://localhost:5000/api/shop/getCart", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data.products);
          setCartItem(res.data);
          fetchProducts(res.data.products);
        })
        .catch((err) => {
          setCartItem([]);
          setProducts([]);
          console.log(err.response.data);
        });
    }
    fetchCart();
    async function fetchProducts(prod) {
      const arr = [];
      prod.map((product) => {
        axios
          .get(`http://localhost:5000/api/shop/${product.productId}`, {
            withCredentials: true,
          })
          .then((res) => {
            arr.push(res.data);
            setProducts(arr);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      });
    }
  }, [click]);

  if (cartItem.products && products) {
    let total = 0;
    cartItem.products.map((product) => {
      total += product.price * product.quantity;
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Cart</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Serial Number</th>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItem.products.map((item, i = 0) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>
                      <img
                        style={{
                          width: "75px",
                          height: "75px",
                        }}
                        src={require(`../uploads/${item.imageUrl}`)}
                      ></img>
                    </td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity * item.price}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          axios
                            .post(
                              `http://localhost:5000/api/shop/delete-from-cart/`,
                              {
                                productId: item.productId,
                              },
                              {
                                withCredentials: true,
                              }
                            )
                            .then((response) => {
                              console.log(response.data);
                              setCartItem(response.data);
                              setClick(1 + click);
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
            <div>
              <h3>Total: ₹{total} </h3>
            </div>
            {products.length > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                  marginRight: "85px",
                }}
              >
                <button
                  className="btn btn-success"
                  onClick={checkOut}
                  style={{
                    padding: "15px",
                    fontSize: "20px",
                    marginBottom: "5px",
                  }}
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          // justifyContent:"center",
          // alignContent:"center",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            alignSelf: "center",
          }}
        >
          Your Cart Is Empty
        </h2>
        <h3
          style={{
            alignSelf: "center",
          }}
        >
          Please Order Something
        </h3>
      </div>
    );
  }
}
export default Cart;
