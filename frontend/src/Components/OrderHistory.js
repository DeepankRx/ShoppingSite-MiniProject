import axios from "axios";
import { useState, useEffect } from "react";
function OrderHistory() {
    let date,time;
    console.log("In Order histoyry")
  const [orderedItems, setOrderedItems] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/shop/orderHistory", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.products)
        setOrderedItems(res.data.products);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);
  if (orderedItems) {
    let total = 0;
    orderedItems.map((product) => {
      total += product.price * product.quantity;
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>OrderHistory</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Serial Number</th>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Date Of Order</th>
                  <th>Time Of Order</th>
                </tr>
              </thead>
              <tbody>
                {orderedItems.map((item, i = 0) => (
                  
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
                    <td>{new Date(item.dateOfOrder).toLocaleDateString().split("/").join("-")
                    }</td>
                    <td>{new Date(item.dateOfOrder).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <h3>Total: ₹{total} </h3>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
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
export default OrderHistory;
