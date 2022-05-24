import NavigationBar from "./Components/NavigationBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from "./Components/AddProduct";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import SingleProduct from "./Components/SingleProduct";
import DeleteProduct from "./Components/DeleteProduct";
import UpdateProduct from "./Components/UpdateProduct";
import PageNotFound from "./Components/PageNotFound";
import AddToCart from "./Components/AddToCart";
import Cart from "./Components/Cart";
function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/product/:productId" element={<SingleProduct />} />
          <Route
            path="/admin-product-delete/:productId"
            element={<DeleteProduct />}
          />
          <Route
            path="/admin-product-update/:productId"
            element={<UpdateProduct />}
          />
          <Route path="/add-to-cart/:productId" element={<AddToCart />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
