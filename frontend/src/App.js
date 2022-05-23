import NavigationBar from "./Components/NavigationBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from "./Components/AddProduct";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import SingleProduct from "./Components/SingleProduct";
import DeleteProduct from "./Components/DeleteProduct";
import UpdateProduct from "./Components/UpdateProduct";
import PageNotFound from "./Components/PageNotFound";
function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<SingleProduct />} />
          <Route path="/admin-product/:productId" element={<DeleteProduct />} />
          <Route path="/update-product/:productId" element={<UpdateProduct />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
