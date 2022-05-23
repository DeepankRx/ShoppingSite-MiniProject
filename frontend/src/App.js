import NavigationBar from "./Components/NavigationBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from "./Components/AddProduct";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import SingleProduct from "./Components/SingleProduct";
function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<SingleProduct />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
